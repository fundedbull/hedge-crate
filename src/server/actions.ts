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

export async function generateCrateAction(prevState: any, formData: FormData) {
  const session = await auth();
  if (!session.userId) {
    return redirect("/sign-in");
  }

  console.log(formData);

  return { message: "Hello", success: true };
}
