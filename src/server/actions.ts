"use server";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { findOptions } from "./polygon/api";

import { QUERIES } from "./db/queries";
import GenerateCSPStrategy from "./chatgpt/api";
import { OptionsData } from "@/lib/types";

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
  const session = await auth();
  if (!session.userId) {
    console.log("User not signed in, redirecting to /sign-in");
    return redirect("/sign-in");
  }

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
      return {
        data: null,
        error:
          "There were no contracts to find with your filter options for this instrument.",
        success: false,
      };
    }

    const strategy: OptionsData | null = await GenerateCSPStrategy(puts[0]);

    return {
      data: strategy,
      error: null,
      success: true,
    };
  } catch (err) {
    console.log(err);
    return {
      data: null,
      error:
        "An unexpected error occurred while generating your crate. Please try again.",
      success: false,
    };
  }
}
