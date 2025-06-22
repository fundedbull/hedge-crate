"use server";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { findOptions } from "./polygon/api";
import { CreateCommonCrate, CreateRareCrate } from "./chatgpt/api";
import { findCoveredCallOptions } from "./polygon/covered-calls";
import { QUERIES } from "./db/queries";
import { db } from "./db";
import { usersTable } from "./db/schema";
import { eq } from "drizzle-orm";

interface FormEntries {
  ticker: string;
  type: string;
  broker: string;
  budget: string;
  riskAmount: string;
  rewardAmount: string;
}

interface ProcessedData {
  ticker: string;
  type: string;
  broker: string;
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
    broker: "other",
    budget: "10000",
    riskAmount: "1",
    rewardAmount: "0.05", // This gives 5% target yield
  };

  // Apply defaults for empty values
  const processed = {
    ticker: formEntries.ticker || defaults.ticker,
    type: formEntries.type || defaults.type,
    broker: formEntries.broker || defaults.broker,
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

export async function generateCrateAction(prevState: any, formData: FormData) {
  const session = await auth();
  if (!session.userId) {
    return redirect("/sign-in");
  }

  const [user] = await QUERIES.getUserByClerkId(session.userId);

  if (!user || user.credits < 1) {
    return {
      message: {
        found: false,
        ticker: "",
        strike: 0.0,
        expiration: "",
        contract: "",
        contracts_to_sell: 0,
        premium_per_contract: 0.0,
        total_premium_income: 0.0,
        cash_required: 0.0,
        annualized_yield: 0.0,
        break_even_price: 0.0,
        setup_plan: "",
        exit_plan: "",
        risk_assessment: "",
        reasoning: "",
      },
      success: false,
    };
  }

  await db
    .update(usersTable)
    .set({ credits: user.credits - 1 })
    .where(eq(usersTable.clerkId, session.userId));

  // Extract and process form data with defaults
  const data = processFormData(formData);
  const getDatePlusMonth = () =>
    new Date(new Date().setMonth(new Date().getMonth() + 1))
      .toISOString()
      .split("T")[0];
  const budget = data.budget;
  const targetYieldPercent = 0.01;
  const expiration = getDatePlusMonth();
  const tickers = [data.ticker];

  try {
    // Find suitable options
    const options = await findOptions(
      tickers,
      targetYieldPercent,
      expiration,
      budget
    );

    if (options.length === 0) {
      return {
        message: "No suitable options found for the given criteria.",
        success: false,
      };
    }

    // Get AI recommendation
    const aiResponse = await CreateCommonCrate(
      budget,
      targetYieldPercent,
      options
    );

    console.log("AI Response:", aiResponse);

    return {
      message: JSON.parse(aiResponse!),
      success: true,
    };
  } catch (error) {
    console.error("Error in generateCrateAction:", error);
    return {
      message: {
        found: false,
        ticker: "",
        strike: 0.0,
        expiration: "",
        contract: "",
        contracts_to_sell: 0,
        premium_per_contract: 0.0,
        total_premium_income: 0.0,
        cash_required: 0.0,
        annualized_yield: 0.0,
        break_even_price: 0.0,
        setup_plan: "",
        exit_plan: "",
        risk_assessment: "",
        reasoning: "",
      },
      success: false,
    };
  }
}

export async function generateRareCrateAction() {
  const options = await findCoveredCallOptions(
    ["ASTS"],
    { ["ASTS"]: 100 },
    0.05,
    "2025-06-28"
  );
  console.log(options);

  const res = await CreateRareCrate(10000, 0.05, options);
  console.log(res);
}
