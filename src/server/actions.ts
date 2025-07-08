"use server";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { findOptions } from "./polygon/api";

import { QUERIES } from "./db/queries";
import GenerateCSPStrategy from "./chatgpt/api";
import { OptionsData } from "@/lib/types";
import { db } from "./db";
import { cardsTable, creditsTransactionTable, usersTable } from "./db/schema";
import { eq } from "drizzle-orm";

interface FormEntries {
  ticker: string;
  type: string;
  budget: string;
  riskAmount: string;
  rewardAmount: string;
}

interface ProcessedData {
  ticker: string;
  type: string;
  budget: number;
  riskAmount: number;
  rewardAmount: number;
  targetYieldPercent: number;
}

const extractFormData = (formData: FormData): FormEntries => {
  const formEntries: Partial<FormEntries> = {};

  for (const [key, value] of formData.entries()) {
    if (!key.startsWith("$ACTION") && typeof value === "string") {
      formEntries[key as keyof FormEntries] = value;
    }
  }

  return formEntries as FormEntries;
};

const processFormData = (formData: FormData): ProcessedData => {
  const formEntries = extractFormData(formData);

  // Set up defaults
  const defaults: FormEntries = {
    ticker: "ASTS",
    type: "common",
    budget: "10000",
    riskAmount: "1",
    rewardAmount: "0.05", // This gives 5% target yield
  };

  // Apply defaults for empty values
  const processed = {
    ticker: formEntries.ticker || defaults.ticker,
    type: formEntries.type || defaults.type,
    budget: parseFloat(formEntries.budget || defaults.budget),
    riskAmount: parseFloat(formEntries.riskAmount || defaults.riskAmount),
    rewardAmount: parseFloat(formEntries.rewardAmount || defaults.rewardAmount),
  };

  // Calculate targetYieldPercent from risk/reward ratio
  const targetYieldPercent =
    processed.riskAmount > 0
      ? processed.rewardAmount / processed.riskAmount
      : 0.05; // Default to 5% if risk is 0

  return {
    ...processed,
    targetYieldPercent,
  };
};

export async function signInRedirect() {
  const session = await auth();
  if (!session.userId) {
    return redirect("/sign-in");
  }
  return redirect("/client");
}

export async function generateCommonCrateAction(
  prevState: any,
  formData: FormData
) {
  console.log("Starting generateCommonCrateAction");

  const session = await auth();
  if (!session.userId) {
    console.log("User not signed in, redirecting to /sign-in");
    return redirect("/sign-in");
  }
  console.log("User session found:", session.userId);

  const [user] = await QUERIES.getUserByClerkId(session.userId);

  if (!user || user.credits < 1) {
    console.log("User has insufficient credits or does not exist.");
    return {
      data: null,
      error: "You have insufficient credits to open a crate.",
      success: false,
    };
  }

  // Extract and process form data with defaults
  const data = processFormData(formData);
  console.log("Processed form data:", data);

  const getDatePlusMonth = () =>
    new Date(new Date().setMonth(new Date().getMonth() + 1))
      .toISOString()
      .split("T")[0];
  const budget = data.budget;
  const targetYieldPercent = 0.01;
  const expiration = getDatePlusMonth();
  const ticker = data.ticker;

  try {
    const puts = await findOptions(ticker, expiration, budget);
    if (puts.length == 0) {
      console.log("No contracts found for the given filter options.");
      return {
        data: null,
        error:
          "There were no contracts to find with your filter options for this instrument.",
        success: false,
      };
    }
    console.log("Found", puts.length, "puts contracts.");

    console.log(
      "Generating CSP strategy with the first put contract:",
      puts[0]
    );
    const strategy = await GenerateCSPStrategy(puts[0]);

    if (!strategy) {
      return {
        data: null,
        error:
          "An unexpected error occurred while generating your crate. Please try again.",
        success: false,
      };
    }

    await Promise.all([
      db
        .update(usersTable)
        .set({ credits: user.credits - 1 })
        .where(eq(usersTable.clerkId, session.userId)),
      db.insert(creditsTransactionTable).values({
        userId: user.id,
        amount: 1,
        type: "crate_open",
      }),
      db.insert(cardsTable).values({
        userId: user.id,
        ticker: strategy["ticker"],
        strike: strategy["strike"].toString(),
        expiration: strategy["expiration"],
        contract: "",
        contractsToSell: strategy["contracts_to_sell"],
        premiumPerContract: strategy["premium_per_contract"].toString(),
        totalPremiumIncome: strategy["total_premium_income"].toString(),
        cashRequired: strategy["cash_required"].toString(),
        annualizedYield: strategy.yield.toString(),
        breakEvenPrice: strategy["break_even_price"].toString(),
        setupPlan: strategy["setup_plan"],
        exitPlan: {
          "PROFIT SCENARIO": strategy.exit_plan_profit_scenario,
          "ASSIGNMENT SCENARIO": strategy.exit_plan_assignment_scenario,
          "EARLY EXIT": strategy.exit_plan_early_exit,
          "STOP LOSS": strategy.exit_plan_stop_loss,
        },
        riskAssessment: strategy["risk_assessment"],
        reasoning: strategy["reasoning"],
        rarity: "common",
      }),
    ]);

    return {
      data: {
        ticker: strategy.ticker,
        strike: strategy.strike,
        expiration: strategy.expiration,
        contracts_to_sell: strategy.contracts_to_sell,
        premium_per_contract: strategy.premium_per_contract,
        total_premium_income: strategy.total_premium_income,
        cash_required: strategy.cash_required,
        yield: strategy.yield,
        break_even_price: strategy.break_even_price,
        setup_plan: strategy.setup_plan,
        exit_plan: {
          "PROFIT SCENARIO": strategy.exit_plan_profit_scenario,
          "ASSIGNMENT SCENARIO": strategy.exit_plan_assignment_scenario,
          "EARLY EXIT": strategy.exit_plan_early_exit,
          "STOP LOSS": strategy.exit_plan_stop_loss,
        },
        risk_assessment: strategy.risk_assessment,
        reasoning: strategy.reasoning,
      },
      error: "",
      success: true,
    };
  } catch (err) {
    console.error("An error occurred during crate generation:", err);
    return {
      data: null,
      error:
        "An unexpected error occurred while generating your crate. Please try again.",
      success: false,
    };
  }
}
