"use server";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { findOptions } from "./polygon/api";
import { CreateCommonCrate } from "./chatgpt/api";

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

  // Extract parameters from form data
  const budget = 10000;
  const targetYieldPercent = 0.01; // 5%
  const expiration = "2025-06-14";
  const tickers = ["ASTS"];

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
      message: aiResponse || "No recommendation generated",
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
