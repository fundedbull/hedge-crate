import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function ArbitrageTypes() {
  const arbitrageTypes = [
    {
      type: "Price Arbitrage",
      description: "One asset priced differently in two markets",
      example: "Buy AAPL on NYSE, sell on London Exchange",
    },
    {
      type: "Put-Call Parity Arbitrage",
      description: "Imbalance between call and put pricing",
      example: "Build synthetic stock for less than real one",
    },
    {
      type: "Box Spread Arbitrage",
      description: "Fixed payoff spread priced wrong ",
      example: "Lock in a $10 box for $9 → risk-free $1",
    },
    {
      type: "Statistical Arbitrage",
      description: "Mean-reverting patterns in related assets",
      example: "Short SPY and long QQQ if they diverge",
    },
    {
      type: "Crypto Arbitrage",
      description: "Asset priced differently on two exchanges",
      example: "Buy BTC on Binance, sell on Coinbase",
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
