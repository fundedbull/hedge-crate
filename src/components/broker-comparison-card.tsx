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
        {/* Mobile view */}
        <div className="md:hidden">
          <div className="space-y-4">
            {brokers.map((broker) => (
              <a href={broker.rank} key={broker.name} className="block">
                <Card className="dark text-white hover:bg-zinc-800">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-medium">
                        {broker.name}
                      </span>
                      <Image
                        src={broker.medal}
                        width={48}
                        height={48}
                        alt={`${broker.name} logo`}
                        className="object-contain rounded-md"
                      />
                    </div>
                    <div className="mt-4 space-y-3 text-sm">
                      <div>
                        <h4 className="font-semibold text-zinc-400">
                          Strengths
                        </h4>
                        <p>{broker.strengths}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-zinc-400">
                          Weaknesses
                        </h4>
                        <p>{broker.weaknesses}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        </div>

        {/* Desktop view */}
        <div className="hidden md:block">
          <Table className="text-lg">
            <TableHeader>
              <TableRow className="border-zinc-700">
                <TableHead className="text-zinc-300 font-medium">
                  Broker
                </TableHead>
                <TableHead className="text-zinc-300 font-medium">
                  Join
                </TableHead>
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
                    <a
                      href={broker.rank}
                      className="text-center w-full h-full"
                    >
                      {broker.name}
                    </a>
                  </TableCell>

                  <TableCell>
                    <a
                      href={broker.rank}
                      className="flex items-center gap-1"
                    >
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
                    <a
                      href={broker.rank}
                      className="text-center w-full h-full"
                    >
                      {broker.strengths}
                    </a>
                  </TableCell>

                  <TableCell className="text-zinc-300">
                    <a
                      href={broker.rank}
                      className="text-center w-full h-full"
                    >
                      {broker.weaknesses}
                    </a>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
