"use server";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { findOptions } from "./polygon/api";
import { CreateCommonCrate, CreateRareCrate } from "./chatgpt/api";
import { findCoveredCallOptions } from "./polygon/covered-calls";
import { QUERIES } from "./db/queries";
import { db } from "./db";
import { cardsTable, creditsTransactionTable, usersTable } from "./db/schema";
import { eq } from "drizzle-orm";
import {
  findBestCashSecuredPuts,
  getTopPicksAnalytical,
} from "./polygon/cash-secured-puts";

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

export async function generateCrateAction(prevState: any, formData: FormData) {
  console.log("generateCrateAction called");
  const session = await auth();
  if (!session.userId) {
    console.log("User not signed in, redirecting to /sign-in");
    return redirect("/sign-in");
  }
  console.log("User session found:", session.userId);

  const [user] = await QUERIES.getUserByClerkId(session.userId);
  console.log("User retrieved from DB:", user);

  if (!user || user.credits < 1) {
    console.log("User has insufficient credits or does not exist.");
    return {
      data: null,
      error: "You have insufficient credits to open a crate.",
      success: false,
    };
  }
  console.log(`User has ${user.credits} credits.`);

  // Extract and process form data with defaults
  const data = processFormData(formData);
  console.log("Form data processed:", data);

  const getDatePlusMonth = () =>
    new Date(new Date().setMonth(new Date().getMonth() + 1))
      .toISOString()
      .split("T")[0];
  const budget = data.budget;
  const targetYieldPercent = 0.01;
  const expiration = getDatePlusMonth();
  const tickers = [data.ticker];
  console.log("Parameters for findOptions:", {
    tickers,
    targetYieldPercent,
    expiration,
    budget,
  });

  try {
    // Find suitable options
    const options = await findOptions(
      tickers,
      targetYieldPercent,
      expiration,
      budget
    );
    console.log("Options found:", options);

    if (options.length === 0) {
      console.log("No suitable options found.");
      return {
        data: null,
        error:
          "No suitable options found for the given criteria. Try adjusting your budget or ticker.",
        success: false,
      };
    }

    // Get AI recommendation
    console.log("Getting AI recommendation...");

    const results = await findBestCashSecuredPuts(
      tickers,
      targetYieldPercent,
      expiration,
      budget
    );

    console.log("\n=== RESULTS SUMMARY ===");
    console.log(`Total contracts analyzed: ${results.summary.totalAnalyzed}`);
    console.log(`Recommended contracts: ${results.summary.recommendedCount}`);
    console.log(`Average yield: ${results.summary.averageYield}%`);
    console.log(`Best yield found: ${results.summary.bestYield}%`);

    // Get top 3 picks analytically (no LLM needed)
    const topPicks = getTopPicksAnalytical(results.recommended, 3);

    console.log("\n=== TOP 3 ANALYTICAL PICKS ===");
    topPicks.forEach((contract, index) => {
      console.log(
        `\n${index + 1}. ${contract.ticker} - Score: ${
          contract.overallScore
        }/100`
      );
      console.log(
        `   Strike: $${contract.strike} | Premium: $${contract.premium}`
      );
      console.log(`   Annualized Yield: ${contract.annualizedYield}%`);
      console.log(
        `   Total Premium Income: $${contract.totalPremiumIncome.toLocaleString()}`
      );
      console.log(
        `   Risk: ${contract.isLowRisk ? "LOW" : "MODERATE"} | Liquidity: ${
          contract.liquidityScore
        }/100`
      );
    });

    // const aiResponse = await CreateCommonCrate(
    //   budget,
    //   targetYieldPercent,
    //   options
    // );

    const aiResponse = null;

    console.log("AI Response (raw):", aiResponse);

    if (!aiResponse) {
      console.error("AI response was null or undefined.");
      return {
        data: null,
        error: "Failed to get a response from the AI. Please try again later.",
        success: false,
      };
    }

    const message = JSON.parse(aiResponse);
    console.log("Parsed AI Response:", message);

    // Deduct credits only after a successful AI response
    await db
      .update(usersTable)
      .set({ credits: user.credits - 1 })
      .where(eq(usersTable.clerkId, session.userId));
    console.log("Credits deducted successfully.");

    await Promise.all([
      db.insert(creditsTransactionTable).values({
        userId: user.id,
        amount: 1,
        type: "crate_open",
      }),
      db.insert(cardsTable).values({
        userId: user.id,
        ticker: message["ticker"],
        strike: message["strike"],
        expiration: message["expiration"],
        contract: message["contract"],
        contractsToSell: message["contracts_to_sell"],
        premiumPerContract: message["premium_per_contract"],
        totalPremiumIncome: message["total_premium_income"],
        cashRequired: message["cash_required"],
        annualizedYield: message["annualized_yield"],
        breakEvenPrice: message["break_even_price"],
        setupPlan: message["setup_plan"],
        exitPlan: message["exit_plan"],
        riskAssessment: message["risk_assessment"],
        reasoning: message["reasoning"],
        rarity: "common",
      }),
    ]);
    console.log("Database updated with new transaction and card.");

    console.log("Action completed successfully.");
    return {
      data: message,
      error: null,
      success: true,
    };
  } catch (error) {
    console.error("Error in generateCrateAction:", error);
    return {
      data: null,
      error:
        "An unexpected error occurred while generating your crate. Please try again.",
      success: false,
    };
  }
}

export async function generateRareCrateAction() {
  console.log("generateRareCrateAction called");

  const tickers = ["ASTS"];
  const portfolio = { ["ASTS"]: 100 };
  const targetYield = 0.05;
  const expiration = "2025-06-28";

  console.log("Parameters for findCoveredCallOptions:", {
    tickers,
    portfolio,
    targetYield,
    expiration,
  });

  const options = await findCoveredCallOptions(
    tickers,
    portfolio,
    targetYield,
    expiration
  );
  console.log("Covered call options found:", options);

  const budget = 10000;
  console.log(
    `Calling CreateRareCrate with budget: ${budget}, targetYield: ${targetYield}`
  );

  const res = await CreateRareCrate(budget, targetYield, options);
  console.log("CreateRareCrate response:", res);

  console.log("generateRareCrateAction finished");
}
