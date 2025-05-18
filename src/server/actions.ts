"use server";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { QUERIES } from "./db/queries";

export async function signInRedirect() {
  const session = await auth();
  if (!session.userId) {
    return redirect("/sign-in");
  }
  return redirect("/client");
}

export async function getUserCreditBalance() {
  const session = await auth();
  if (!session.userId) return 0;

  const [user] = await QUERIES.getUserByClerkId(session.userId);
  if (!user) return 0;

  return user.credits;
}
