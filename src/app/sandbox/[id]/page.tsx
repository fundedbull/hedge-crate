import HedgeCrateCard from "@/components/hedge-crate-card";
import { QUERIES } from "@/server/db/queries";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [card] = await QUERIES.getCard(Number(BigInt(id)));

  return (
    <HedgeCrateCard
      stock={card.instrument}
      strategy={card.strategy}
      difficulty={card.difficulty}
      trades={card.setup}
      exitPlan={card.exitPlan}
    />
  );
}
