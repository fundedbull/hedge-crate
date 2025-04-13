import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function CrateTypes() {
  const arbitrageTypes = [
    {
      type: "Common Crate",
      description: "Basic arbitrage (e.g., put-call parity)",
      example: "Easy",
    },
    {
      type: "Rare Crate",
      description: "Intermediate synthetic/mispricing logic",
      example: "Medium",
    },
    {
      type: "Epic Crate",
      description: "Advanced setups like box spreads",
      example: "Hard",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Types of Arbitrage in Trading</CardTitle>
        <CardDescription>
          Common arbitrage strategies used in financial markets
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b text-left text-sm font-medium text-muted-foreground">
                <th className="pb-3 pl-4">Arbitrage Type</th>
                <th className="pb-3">Description</th>
                <th className="pb-3">Example</th>
              </tr>
            </thead>
            <tbody>
              {arbitrageTypes.map((item, index) => (
                <tr
                  key={index}
                  className="border-b last:border-0 hover:bg-muted/50"
                >
                  <td className="py-3 pl-4 font-medium">{item.type}</td>
                  <td className="py-3">{item.description}</td>
                  <td className="py-3 pr-4">{item.example}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
