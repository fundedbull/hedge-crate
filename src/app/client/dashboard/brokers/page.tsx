import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  ArrowRight,
  Zap,
  BarChart3,
  Clock,
  Code,
  ListFilter,
  Layers,
} from "lucide-react";
import Image from "next/image";
import BrokerComparisonCard from "@/components/broker-comparison-card";

export default function HedgeGuidePage() {
  return (
    <div className=" p-6 ">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Hedge Crates Brokers
          </h1>
          <p className="text-muted-foreground">
            Speed is everything in hedge trading. Here are 5 ways to maximize
            trade execution.
          </p>
        </div>

        <Tabs defaultValue="option1" className="w-full dark">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="option1">Option 1</TabsTrigger>
            <TabsTrigger value="option2">Option 2</TabsTrigger>
            <TabsTrigger value="option3">Option 3</TabsTrigger>
            <TabsTrigger value="option4">Option 4</TabsTrigger>
            <TabsTrigger value="option5">Option 5</TabsTrigger>
          </TabsList>

          <TabsContent value="option1" className="space-y-4 mt-6">
            <Card className="dark">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-amber-500" />
                  Option 1: Webull
                </CardTitle>
                <CardDescription>
                  Trade through platforms with specific features for maximum
                  speed
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Key features</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-500" />
                      <span>
                        Commission-free equities & options with no account
                        minimum
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-500" />
                      <span>
                        Advanced options chain with real-time Greeks, IV rank,
                        open interest
                      </span>
                    </li>

                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-500" />
                      <span>
                        Custom watchlists & alerting (price, technical
                        indicators)
                      </span>
                    </li>
                  </ul>
                </div>

                <Separator />

                <div className="space-y-4 p-6">
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="aspect-video w-full bg-gradient-to-br from-blue-500 to-purple-600">
                      <img
                        src="/images/webull-dashboard.png"
                        alt="Tastyrade platform interface"
                        className="w-full h-full object-fill"
                      />
                    </div>

                    <div className="aspect-video w-full bg-gradient-to-br from-green-500 to-teal-600">
                      <img
                        src="/images/webull-dashboard2.png"
                        alt="IBKR Trader Workstation interface"
                        className="w-full h-full object-fill"
                      />
                    </div>

                    <div className="aspect-video w-full bg-gradient-to-br from-orange-500 to-red-600">
                      <img
                        src="/images/webull-dashboard3.png"
                        alt="ThinkorSwim platform interface"
                        className="w-full h-full object-fill"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="option2" className="space-y-4 mt-6">
            <Card className="dark">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-amber-500" />
                  Option 2: Robinhood
                </CardTitle>
                <CardDescription>
                  Trade through platforms with specific features for maximum
                  speed
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Key features</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-500" />
                      <span>
                        Ultra-simplified mobile-first UI for quick orders
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-500" />
                      <span>
                        Fractional-share trading enables scaled CSPs on
                        high-price stocks
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-500" />
                      <span>Instant deposit & extended-hours trading</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-500" />
                      <span>Built-in cash management (cash sweep)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-500" />
                      <span>
                        Basic options chain with visual payoff diagrams
                      </span>
                    </li>
                  </ul>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-medium">Best Options:</h3>
                  <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                      <CardHeader className="p-4">
                        <CardTitle className="text-base">Tastyrade</CardTitle>
                        <CardDescription>
                          Fast option routing, vertical spreads
                        </CardDescription>
                      </CardHeader>
                    </Card>
                    <Card>
                      <CardHeader className="p-4">
                        <CardTitle className="text-base">IBKR</CardTitle>
                        <CardDescription>
                          Trader Workstation — full pro suite
                        </CardDescription>
                      </CardHeader>
                    </Card>
                    <Card>
                      <CardHeader className="p-4">
                        <CardTitle className="text-base">ThinkorSwim</CardTitle>
                        <CardDescription>
                          TD Ameritrade — hotkeys + scripting
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="option3" className="space-y-4 mt-6">
            <Card className="dark">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-amber-500" />
                  Option 3: MooMoo
                </CardTitle>
                <CardDescription>
                  Trade through platforms with specific features for maximum
                  speed
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Key features</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-500" />
                      <span>
                        Level II quotes & depth-of-market data for stocks &
                        options
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-500" />
                      <span>
                        Advanced charting (hundreds of indicators + drawing
                        tools)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-500" />
                      <span>
                        Option chains with historical volatility charts and
                        option skew visualization
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-500" />
                      <span>Community chat & trade-room features</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-500" />
                      <span>
                        Multi-leg order placement with one-click spread tickets
                      </span>
                    </li>
                  </ul>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-medium">Best Options:</h3>
                  <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                      <CardHeader className="p-4">
                        <CardTitle className="text-base">Tastyrade</CardTitle>
                        <CardDescription>
                          Fast option routing, vertical spreads
                        </CardDescription>
                      </CardHeader>
                    </Card>
                    <Card>
                      <CardHeader className="p-4">
                        <CardTitle className="text-base">IBKR</CardTitle>
                        <CardDescription>
                          Trader Workstation — full pro suite
                        </CardDescription>
                      </CardHeader>
                    </Card>
                    <Card>
                      <CardHeader className="p-4">
                        <CardTitle className="text-base">ThinkorSwim</CardTitle>
                        <CardDescription>
                          TD Ameritrade — hotkeys + scripting
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="option4" className="space-y-4 mt-6">
            <Card className="dark">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-amber-500" />
                  Option 4: Tastytrade
                </CardTitle>
                <CardDescription>
                  Trade through platforms with specific features for maximum
                  speed
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Key features</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-500" />
                      <span>
                        In-depth educational content (live shows, strategy
                        breakdowns)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-500" />
                      <span>
                        Probabilistic analytics (probability of profit, risk
                        curves)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-500" />
                      <span>
                        Trade cheeseboards for rapid multi-leg adjustments
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-500" />
                      <span>
                        Tastyworks execution engine for low-slippage fills
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-500" />
                      <span>Mobile + desktop platforms</span>
                    </li>
                  </ul>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-medium">Best Options:</h3>
                  <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                      <CardHeader className="p-4">
                        <CardTitle className="text-base">Tastyrade</CardTitle>
                        <CardDescription>
                          Fast option routing, vertical spreads
                        </CardDescription>
                      </CardHeader>
                    </Card>
                    <Card>
                      <CardHeader className="p-4">
                        <CardTitle className="text-base">IBKR</CardTitle>
                        <CardDescription>
                          Trader Workstation — full pro suite
                        </CardDescription>
                      </CardHeader>
                    </Card>
                    <Card>
                      <CardHeader className="p-4">
                        <CardTitle className="text-base">ThinkorSwim</CardTitle>
                        <CardDescription>
                          TD Ameritrade — hotkeys + scripting
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="option5" className="space-y-4 mt-6">
            <Card className="dark">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-amber-500" />
                  Option 5: ThinkorSwim
                </CardTitle>
                <CardDescription>
                  Trade through platforms with specific features for maximum
                  speed
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Key features</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-500" />
                      <span>
                        Professional-grade charting & on-chart order entry
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-500" />
                      <span>
                        ThinkScript® custom indicator & strategy backtester
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-500" />
                      <span>
                        Probability Lab for volatility skew & risk assessment
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-500" />
                      <span>Iron-condor & multi-leg order templates</span>
                    </li>
                  </ul>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-medium">Best Options:</h3>
                  <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                      <CardHeader className="p-4">
                        <CardTitle className="text-base">Tastyrade</CardTitle>
                        <CardDescription>
                          Fast option routing, vertical spreads
                        </CardDescription>
                      </CardHeader>
                    </Card>
                    <Card>
                      <CardHeader className="p-4">
                        <CardTitle className="text-base">IBKR</CardTitle>
                        <CardDescription>
                          Trader Workstation — full pro suite
                        </CardDescription>
                      </CardHeader>
                    </Card>
                    <Card>
                      <CardHeader className="p-4">
                        <CardTitle className="text-base">ThinkorSwim</CardTitle>
                        <CardDescription>
                          TD Ameritrade — hotkeys + scripting
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <BrokerComparisonCard />

        {/* <Card className="dark">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-amber-500" />
              Performance Tips
            </CardTitle>
            <CardDescription>
              Additional recommendations for optimal trading performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <div className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-500" />
                <span>
                  Use a dedicated trading machine with minimal background
                  processes
                </span>
              </li>
              <li className="flex items-start gap-2">
                <div className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-500" />
                <span>Ensure a stable, low-latency internet connection</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-500" />
                <span>
                  Practice your execution workflow until it becomes muscle
                  memory
                </span>
              </li>
            </ul>
          </CardContent>
        </Card> */}
      </div>
    </div>
  );
}
