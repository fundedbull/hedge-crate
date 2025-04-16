import { MUTATIONS, QUERIES } from "@/server/db/queries";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();

  if (!session.userId) return redirect("/sign-in");

  const [user] = await QUERIES.getUserByClerkId(session.userId);
  if (!user) {
    const [userId] = await MUTATIONS.createNewUser(session.userId);
    return redirect("/client");
  }
  return <></>;
}
