import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
export default function BrokerComparisonCard() {
  const brokers = [
    {
      name: "Webull",
      rank: "https://a.webull.com/BBxteQGIgeHFQqmLj2",
      medal: "/images/webull.png",
      strengths: "Good mobile access, fast enough for casual trades",
      weaknesses: "No advanced order types",
    },

    {
      name: "Robinhood",
      rank: "https://join.robinhood.com/michaer-1ebc58",
      medal: "/images/robinhood.webp",
      strengths: "Super simple UX, quick entry for beginners",
      weaknesses: "Slow Greeks updates, spread risk",
    },
    {
      name: "MooMoo",
      rank: "https://j.moomoo.com/08ENBA",
      medal: "/images/moomoo.jpg",
      strengths: "Institutional-grade speed, tight spreads",
      weaknesses: "Complex UI, learning curve",
    },
    {
      name: "Tastytrade",
      rank: "https://open.tastytrade.com/signup?referralCode=WD95ESFEXP",
      medal: "/images/seo-tasty.webp",
      strengths: "Fast routing, combo orders, real-time IV",
      weaknesses: "Slightly complex for beginners",
    },
    {
      name: "ThinkorSwim",
      rank: "https://www.schwab.com/client-referral?refrid=REFERFCPPM224",
      medal: "/images/thinkerswim.png",
      strengths: "Professional tools, quick refresh, risk graphs",
      weaknesses: "Heavier desktop app",
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
              <TableHead className="text-zinc-300 font-medium">Join</TableHead>
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
                <TableCell className="font-medium">
                  <a href={broker.rank} className="text-center w-full h-full">
                    {broker.name}
                  </a>
                </TableCell>

                <TableCell>
                  <a href={broker.rank} className="flex items-center gap-1">
                    <Image
                      src={broker.medal}
                      width={64}
                      height={64}
                      alt="Picture of the author"
                      className="min-w-[64px] min-h-[64px] object-contain"
                    />
                  </a>
                </TableCell>

                <TableCell>
                  <a href={broker.rank} className="text-center w-full h-full">
                    {broker.strengths}
                  </a>
                </TableCell>

                <TableCell className="text-zinc-300">
                  <a href={broker.rank} className="text-center w-full h-full">
                    {broker.weaknesses}
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
