import { CrateList } from "@/components/crate-list";
import { HedgingTypes } from "@/components/hedging-types";
import { ArbitrageTypes } from "@/components/arbitrage-types";
import { CrateTypes } from "@/components/crate-types";

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <CrateList crates={[]} />
      <h2 className="text-2xl font-bold mt-8 mb-4">Charts</h2>
      <HedgingTypes />
      <ArbitrageTypes />
      <CrateTypes />
    </div>
  );
}
