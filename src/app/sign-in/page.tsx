import { SignIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();
  if (session.userId) {
    return redirect("/client");
  }
  return (
    <main className="flex justify-center items-center min-h-screen">
      <SignIn />
    </main>
  );
}
