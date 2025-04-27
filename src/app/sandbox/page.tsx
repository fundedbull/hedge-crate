import HedgeCrateCard from "@/components/hedge-crate-card";
import { Button } from "@/components/ui/button";
import { UpgradeModal } from "@/components/upgrade-modal";
import CreateCommonCreateHistoricalContext from "@/server/chatgpt/api";
import { MUTATIONS, QUERIES } from "@/server/db/queries";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();
  if (!session.userId) {
    return redirect("/sign-in");
  }
  return (
    <>
      <UpgradeModal />
      <HedgeCrateCard />
      <form
        action={async () => {
          "use server";
          await CreateCommonCreateHistoricalContext();
        }}
      >
        <h1 className="text-red-600 font-bold text-4xl">
          MAKE SURE THE USER EXISTS ON THE DB
        </h1>
        <Button type="submit">Create Transaction</Button>
      </form>

      <form
        action={async () => {
          "use server";
          await MUTATIONS.openCrate(session.userId, "common");
          const [user] = await QUERIES.getUserByClerkId(session.userId);
          const crate = await QUERIES.getCratesByUserId(user.id);
          return redirect(`/sandbox/${crate[0].id}`);
        }}
      >
        <Button type="submit">Generate Card</Button>
      </form>
    </>
  );
}
