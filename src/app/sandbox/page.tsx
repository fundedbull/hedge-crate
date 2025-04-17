import { Button } from "@/components/ui/button";
import { MUTATIONS } from "@/server/db/queries";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();
  if (!session.userId) {
    return redirect("/sign-in");
  }
  return (
    <form
      action={async () => {
        "use server";
        await MUTATIONS.openCrate(session.userId, "common");
      }}
    >
      <h1 className="text-red-600 font-bold text-4xl">
        MAKE SURE THE USER EXISTS ON THE DB
      </h1>
      <Button type="submit">Create Transaction</Button>
    </form>
  );
}
