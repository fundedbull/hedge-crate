import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function BrokerComparisonCard() {
  const brokers = [
    {
      name: "Tastytrade",
      rank: 1,
      medal: "🥇",
      strengths: "Fast routing, combo orders, real-time IV",
      weaknesses: "Slightly complex for beginners",
    },
    {
      name: "ThinkorSwim",
      rank: 2,
      medal: "🥈",
      strengths: "Professional tools, quick refresh, risk graphs",
      weaknesses: "Heavier desktop app",
    },
    {
      name: "Interactive Brokers",
      rank: 3,
      medal: "🥉",
      strengths: "Institutional-grade speed, tight spreads",
      weaknesses: "Complex UI, learning curve",
    },
    {
      name: "Webull",
      rank: 4,
      medal: "🏅",
      strengths: "Good mobile access, fast enough for casual trades",
      weaknesses: "No advanced order types",
    },
    {
      name: "Robinhood",
      rank: 5,
      medal: "🎖️",
      strengths: "Super simple UX, quick entry for beginners",
      weaknesses: "Slow Greeks updates, spread risk",
    },
  ];

  return (
    <Card className="w-full bg-zinc-900 text-white border-zinc-800">
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl font-bold text-center">
          Top Trading Brokers Comparison
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table className="text-lg">
          <TableHeader>
            <TableRow className="border-zinc-700">
              <TableHead className="text-zinc-300 font-medium">
                Broker
              </TableHead>
              <TableHead className="text-zinc-300 font-medium">Rank</TableHead>
              <TableHead className="text-zinc-300 font-medium">
                Strengths
              </TableHead>
              <TableHead className="text-zinc-300 font-medium">
                Weaknesses
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {brokers.map((broker) => (
              <TableRow key={broker.name} className="border-zinc-700">
                <TableCell className="font-medium">{broker.name}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <span>{broker.medal}</span>
                    <span>#{broker.rank}</span>
                  </div>
                </TableCell>
                <TableCell>{broker.strengths}</TableCell>
                <TableCell className="text-zinc-300">
                  {broker.weaknesses}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
