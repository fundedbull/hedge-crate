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

export default function HedgeGuidePage() {
  return (
    <div className=" p-6 ">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Hedge Crafts Guide
          </h1>
          <p className="text-muted-foreground">
            Speed is everything in arbitrage trading. Here are 5 ways to
            maximize trade execution.
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
                  Option 1: Use a Fast, Direct Brokerage Platform
                </CardTitle>
                <CardDescription>
                  Trade through platforms with specific features for maximum
                  speed
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Key Features to Look For:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-500" />
                      <span>Direct order routing (no PFOF delays)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-500" />
                      <span>
                        Hotkey support (like ThinkorSwim, Interactive Brokers)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-500" />
                      <span>Real-time options chains with live Greeks</span>
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

          <TabsContent value="option2" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-amber-500" />
                  Option 2: Preload Symbols & Strikes
                </CardTitle>
                <CardDescription>
                  Instead of opening the crate then going to your broker
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Pre-set:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-500" />
                      <span>The underlying symbol (like TSLA)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-500" />
                      <span>The strike price and expiration date</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-500" />
                      <span>
                        Both legs (calls and puts) in your order panel
                      </span>
                    </li>
                  </ul>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-medium">
                    When you open the crate, all you do is:
                  </h3>
                  <div className="flex items-center gap-2 p-4 bg-muted rounded-lg">
                    <span className="font-medium">Adjust size</span>
                    <ArrowRight className="h-4 w-4" />
                    <span className="font-medium">Submit</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="option3" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5 text-amber-500" />
                  Option 3: Use Order Templates or Scripts
                </CardTitle>
                <CardDescription>
                  Automate your trading with pre-configured templates and
                  scripts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Many platforms support:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-500" />
                      <span>
                        One-click order presets (e.g., Buy Call + Sell Put)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-500" />
                      <span>Custom strategies saved for speed</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-500" />
                      <span>
                        API-based order placement (IBKR, Tradestation, Alpaca)
                      </span>
                    </li>
                  </ul>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-medium">For example:</h3>
                  <div className="bg-slate-900 text-slate-50 p-4 rounded-md font-mono text-sm">
                    <div className="text-slate-400"># Python example</div>
                    <div className="text-slate-50">
                      ib.place_order('TSLA', buy_call_220, sell_put_220)
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="option4" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ListFilter className="h-5 w-5 text-amber-500" />
                  Option 4: Advanced Order Types
                </CardTitle>
                <CardDescription>
                  Use specialized order types to optimize execution
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-500" />
                      <span>
                        Limit orders based on mark price (not just bid/ask)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-500" />
                      <span>
                        GTC (Good 'Til Cancelled) for trades you want to leave
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-500" />
                      <span>
                        Conditional orders (e.g., only trigger if price hits X)
                      </span>
                    </li>
                  </ul>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-medium">Benefits:</h3>
                  <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                      <CardHeader className="p-4">
                        <CardTitle className="text-base">Precision</CardTitle>
                        <CardDescription>
                          Execute at exact price points
                        </CardDescription>
                      </CardHeader>
                    </Card>
                    <Card>
                      <CardHeader className="p-4">
                        <CardTitle className="text-base">Automation</CardTitle>
                        <CardDescription>
                          Set and forget until conditions are met
                        </CardDescription>
                      </CardHeader>
                    </Card>
                    <Card>
                      <CardHeader className="p-4">
                        <CardTitle className="text-base">Efficiency</CardTitle>
                        <CardDescription>
                          Reduce manual monitoring time
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="option5" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Layers className="h-5 w-5 text-amber-500" />
                  Option 5: Multiple Tabs or Devices
                </CardTitle>
                <CardDescription>
                  Distribute your workflow across multiple interfaces
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-500" />
                      <span>Use a phone and computer</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-500" />
                      <span>Have multiple brokers open on multiple tabs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-500" />
                      <span>
                        Can even use multiple people: one opens crate, other
                        places trade
                      </span>
                    </li>
                  </ul>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-medium">Setup Example:</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                      <CardHeader className="p-4">
                        <CardTitle className="text-base">Device 1</CardTitle>
                        <CardDescription>
                          Monitor market and identify opportunities
                        </CardDescription>
                      </CardHeader>
                    </Card>
                    <Card>
                      <CardHeader className="p-4">
                        <CardTitle className="text-base">Device 2</CardTitle>
                        <CardDescription>
                          Pre-loaded with order templates ready to execute
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

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
