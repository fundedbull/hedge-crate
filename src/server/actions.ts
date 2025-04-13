"use server";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function signInRedirect() {
  const session = await auth();
  if (!session.userId) {
    return redirect("/sign-in");
  }
  return redirect("/client");
}
