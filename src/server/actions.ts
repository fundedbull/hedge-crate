"use server";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { findOptions } from "./polygon/api";
import { CreateCommonCrate } from "./chatgpt/api";

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

  console.log(formData);

  // Extract and process form data with defaults
  const data = processFormData(formData);

  const budget = data.budget;
  const targetYieldPercent = data.targetYieldPercent;
  const expiration = "2025-06-14";
  const tickers = [data.ticker];

  console.log("Processed data:", data);

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
      message:
        aiResponse ||
        `No recommendation generated for ${data.ticker} with ${(
          targetYieldPercent * 100
        ).toFixed(0)}% target yield`,
      success: true,
    };
  } catch (error) {
    console.error("Error in generateCrateAction:", error);
    return {
      message: `Error: ${error}`,
      success: false,
    };
  }
}
