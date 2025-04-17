import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function CrateTypes() {
  const strategies = [
    {
      type: "Common Crate",
      name: "Put-Call Parity",
      features: [
        "Simple to understand",
        "Foundational to all options pricing",
        "Easy to spot in data",
        "Teaches core math (hedging, synthetic stock)",
        "Perfect for beginners to learn why options work the way they do",
      ],
      difficulty: "Easy",
    },
    {
      type: "Rare Crate",
      name: "Synthetic Arbitrage",
      features: [
        "Slightly more advanced concept",
        "Involves comparing synthetic stock vs real stock",
        "Teaches mispricing and structural inefficiencies",
        "Medium-tier traders can appreciate it — they've probably seen it without understanding how to capitalize",
      ],
      difficulty: "Medium",
    },
    {
      type: "Epic Crate",
      name: "Box Spread Arbitrage",
      features: [
        "Pure institutional-grade arbitrage",
        "Zero-risk if done correctly",
        'Requires precision execution (hence "Epic")',
        "Rare in the wild — but very real",
        'Advanced users love seeing this because it\'s one of the few "perfect logic" trades left in the wild',
      ],
      difficulty: "Hard",
    },
  ];

  const getBadgeColor = (difficulty: "Easy" | "Medium" | "Hard") => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "Hard":
        return "bg-red-100 text-red-800";
      default:
        return "bg-slate-100";
    }
  };

  return (
    <Card className="dark">
      <CardHeader>
        <CardTitle>Types of Strategies in Trading</CardTitle>
        <CardDescription>
          Common arbitrage strategies used in financial markets
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {strategies.map((strategy, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">
                  {strategy.name} ({strategy.type})
                </h3>
                <span
                  className={`px-3 py-1 text-sm rounded-full ${getBadgeColor(
                    strategy.difficulty as "Easy" | "Medium" | "Hard"
                  )}`}
                >
                  {strategy.difficulty}
                </span>
              </div>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                {strategy.features.map((feature, featureIndex) => (
                  <li key={featureIndex}>{feature}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
