import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function HedgingTypes() {
  const hedgingTypes = [
    {
      type: "Options Hedging",
      description: "Using calls or puts to limit loss from a stock position",
    },
    {
      type: "Delta Hedging",
      description:
        "Adjusting positions so net delta = 0 (no directional exposure)",
    },
    {
      type: "Spread Hedging",
      description:
        "Using spreads (vertical, calendar, etc.) to control risk within price bands",
    },
    {
      type: "Portfolio Hedging",
      description:
        "Using broad market instruments to protect multi-asset portfolios",
    },
    {
      type: "Synthetic Hedging",
      description: "Replacing assets with equivalent option structures",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Types of Hedging in Trading</CardTitle>
        <CardDescription>
          Common hedging strategies used in financial markets
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b text-left text-sm font-medium text-muted-foreground">
                <th className="pb-3 pl-4">Hedge Type</th>
                <th className="pb-3">Description</th>
              </tr>
            </thead>
            <tbody>
              {hedgingTypes.map((item, index) => (
                <tr
                  key={index}
                  className="border-b last:border-0 hover:bg-muted/50"
                >
                  <td className="py-3 pl-4 font-medium">{item.type}</td>
                  <td className="py-3 pr-4">{item.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
