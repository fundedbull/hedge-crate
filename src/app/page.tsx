import Footer from "@/components/footer";
import { StockTicker } from "@/components/stock-ticker";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { signInRedirect } from "@/server/actions";
import {
  CalculatorIcon,
  ChartBarIcon,
  CheckCircle2Icon,
  CloudIcon,
  CreditCardIcon,
  InfoIcon,
  ListFilterIcon,
  LockIcon,
  NotebookIcon,
  PackageOpenIcon,
  SparklesIcon,
  ZapIcon,
} from "lucide-react";
import Image from "next/image";

const stockData = [
  {
    symbol: "TSLA",
    name: "Tesla Inc",
    price: 177.67,
    change: 2.45,
    changePercent: 1.4,
    imageUrl: "/images/TSLA_LOGO.png",
  },
  // {
  //   symbol: "AAPL",
  //   name: "Apple Inc",
  //   price: 175.04,
  //   change: -0.89,
  //   changePercent: -0.51,
  //   imageUrl: "/images/TSLA_LOGO.png"
  // },
  {
    symbol: "QQQ",
    name: "Invesco QQQ Trust",
    price: 444.89,
    change: 3.12,
    changePercent: 0.71,
    imageUrl: "/images/QQQ_LOGO.png",
  },
  {
    symbol: "US30",
    name: "Dow Jones Industrial Average",
    price: 38010.15,
    change: -102.35,
    changePercent: -0.27,
    imageUrl: "/images/US30_LOGO.png",
  },
  {
    symbol: "NASDAQ",
    name: "NASDAQ Composite",
    price: 16920.8,
    change: 98.3,
    changePercent: 0.58,
    imageUrl: "/images/NVDA_LOGO.png",
  },
  {
    symbol: "SPX",
    name: "S&P 500",
    price: 5187.67,
    change: 12.45,
    changePercent: 0.24,
    imageUrl: "/images/SP_500_LOGO.png",
  },
];

export default function Home() {
  return (
    <main className="w-full h-fit flex flex-col gap-4 p-4 dark">
      <section className="flex flex-col md:flex-row md:justify-between gap-2">
        <article className="flex flex-col gap-4 ">
          <p className="border border-white/40 rounded-full w-fit px-4 py-2 text-sm bg-radial from-transparent from-20% to-white/40">
            Our Creates, Your Trades
          </p>
          <h1 className="text-5xl md:text-6xl font-bold max-w-xl text-wrap">
            Harness the Power of AI to Find Abritrage in Hedging.
          </h1>
          <p>Start your free trial today!</p>
          <div className="grid grid-cols-2 grid-rows-2 gap-2">
            <div className="flex gap-2 text-sm md:text-lg">
              <CheckCircle2Icon className="stroke-blue-500" />
              <p>Strategy Overview</p>
            </div>
            <div className="flex gap-2 text-sm md:text-lg">
              <CheckCircle2Icon className="stroke-blue-500" />
              <p>Trade Setup</p>
            </div>
            <div className="flex gap-2 text-sm md:text-lg">
              <CheckCircle2Icon className="stroke-blue-500" />
              <p>Trade Thesis</p>
            </div>
            <div className="flex gap-2 text-sm md:text-lg">
              <CheckCircle2Icon className="stroke-blue-500" />
              <p>Exit Plan</p>
            </div>
          </div>
          <div className="flex w-full gap-2 max-w-xl">
            <form className="w-1/2" action={signInRedirect}>
              <Button className="w-full">Start Trial</Button>
            </form>

            <Button className="w-1/2" asChild variant="outline">
              <a href="https://discord.gg/Rw5RR5kJeM">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className=""
                  viewBox="0 0 16 16"
                >
                  <path d="M13.545 2.907a13.2 13.2 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.2 12.2 0 0 0-3.658 0 8 8 0 0 0-.412-.833.05.05 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.04.04 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032q.003.022.021.037a13.3 13.3 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019q.463-.63.818-1.329a.05.05 0 0 0-.01-.059l-.018-.011a9 9 0 0 1-1.248-.595.05.05 0 0 1-.02-.066l.015-.019q.127-.095.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.05.05 0 0 1 .053.007q.121.1.248.195a.05.05 0 0 1-.004.085 8 8 0 0 1-1.249.594.05.05 0 0 0-.03.03.05.05 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.2 13.2 0 0 0 4.001-2.02.05.05 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.03.03 0 0 0-.02-.019m-8.198 7.307c-.789 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612m5.316 0c-.788 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612" />
                </svg>
                Join Discord
              </a>
            </Button>
          </div>
        </article>
        <Image
          width={1024}
          height={1024}
          src="/images/hedge-crate.png"
          className="rounded-lg aspect-square md:w-xl"
          alt="decorative"
        />
      </section>
      <StockTicker stocks={stockData} pauseOnHover={false} />
      <section className="flex flex-col items-center gap-8 bg-gradient-to-r from-transparent from-25%% via-blue-600/20 via-50% to-transparent p-4 md:p-20">
        <h1 className="text-5xl md:text-7xl font-bold text-center">
          Turn Strategies into Skills
        </h1>
        <h1 className="text-5xl md:text-7xl font-bold text-center">
          One Crate at a Time.
        </h1>
      </section>

      <section
        id="crates"
        className="flex flex-col md:justify-center md:items-center gap-4"
      >
        <h1 className="text-5xl md:text-6xl font-bold ">Select your Crate</h1>

        <Tabs defaultValue="common" className="w-full max-w-2xl ">
          <div className="flex gap-2">
            <Button className="w-fit">
              <ListFilterIcon />
            </Button>
            <TabsList className="w-full">
              <TabsTrigger value="common">Common</TabsTrigger>
              <TabsTrigger value="rare" disabled>
                <LockIcon />
                Rare
              </TabsTrigger>
              <TabsTrigger value="epic" disabled>
                <LockIcon />
                Epic
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent className="w-full " value="common">
            <div className="w-full h-full relative">
              <Image
                width={1024}
                height={1024}
                src="/images/common-crate.png"
                className="rounded-lg"
                alt="decorative"
              />
              <HoverCard>
                <HoverCardTrigger
                  className="absolute hidden md:block top-1/6 right-0"
                  asChild
                >
                  <InfoIcon className="size-10" />
                </HoverCardTrigger>
                <HoverCardContent className="w-full p-4 dark">
                  <div className="text-lg">
                    Ideal for: <br /> 🧠 New traders <br /> 📘 Strategy learners{" "}
                    <br /> 🧪 Math-first thinkers
                  </div>
                </HoverCardContent>
              </HoverCard>

              <Dialog>
                <DialogTrigger
                  className="absolute md:hidden top-1/6 right-0"
                  asChild
                >
                  <InfoIcon className="size-10 cursor-pointer" />
                </DialogTrigger>
                <DialogContent className="w-full p-4 dark">
                  <DialogTitle>Ideal for</DialogTitle>
                  <DialogDescription>
                    🧠 New traders <br /> 📘 Strategy learners <br /> 🧪
                    Math-first thinkers
                  </DialogDescription>
                </DialogContent>
              </Dialog>
            </div>
            <article className="bg-gradient-to-r from-transparent from-25%% via-blue-600/20 via-50% to-transparent border-2 border-white/10 p-4 rounded-lg space-y-4">
              <h2 className="text-lg md:text-3xl flex items-center gap-1">
                <NotebookIcon className="stroke-blue-600" />A real backtested
                hedging strategy
              </h2>
              <p className="text-lg md:text-3xl flex items-center gap-1">
                <CalculatorIcon className="stroke-blue-600" /> A calculated
                setup based on inefficiencies
              </p>
              <p className="text-lg md:text-3xl flex items-center gap-1">
                <CloudIcon className="stroke-blue-600" />
                Educational insights and risk ratings
              </p>
              <p className="text-lg md:text-3xl flex gap-1">
                <CreditCardIcon className="stroke-blue-600" /> The exact trade:
                entry, logic, and exit
              </p>
              <Button className="w-full">
                Generate <PackageOpenIcon /> 1
              </Button>
            </article>
          </TabsContent>
          <TabsContent value="rare">Coming Soon.</TabsContent>
          <TabsContent value="epic">Coming Soon.</TabsContent>
        </Tabs>
      </section>

      <section id="features" className="flex flex-col gap-4 py-10 ">
        <article className="bg-gradient-to-r from-transparent from-25%% via-blue-600/20 via-50% to-transparent py-4 rounded-xl space-y-4">
          <p className="border border-blue-600/80 rounded-full w-fit px-4 py-2 text-sm bg-radial from-transparent from-20% to-blue-600/80">
            Features
          </p>
          <h1 className="text-4xl md:text-5xl font-bold">
            Check out what Hedge Creates Offers
          </h1>
        </article>
        <article className="flex flex-col gap-1 bg-gradient-to-r from-transparent from-25%% via-blue-600/20 via-50% to-transparent p-4 rounded-xl space-y-2">
          <div className="flex items-center gap-2">
            <ZapIcon className="size-10 border-white border-2 rounded-lg px-1" />
            <h1 className="text-2xl md:text-4xl font-medium">
              {" "}
              Instant Access{" "}
            </h1>
          </div>
          <p className="md:text-2xl">
            Just generate a card and instantly get a hedged arbitrage setup.
          </p>
        </article>
        <article className="flex flex-col gap-1 bg-gradient-to-r from-transparent from-25%% via-blue-600/20 via-50% to-transparent p-4 rounded-xl space-y-2">
          <div className="flex items-center gap-2">
            <ChartBarIcon className="size-10 border-white border-2 rounded-lg px-1" />
            <h1 className="text-2xl md:text-4xl font-medium">
              {" "}
              Personal Dashboard{" "}
            </h1>
          </div>
          <p className="md:text-2xl">
            In your client area you can view past crates opened and setup
            history,
          </p>
        </article>
        <article className="flex flex-col gap-1 bg-gradient-to-r from-transparent from-25%% via-blue-600/20 via-50% to-transparent p-4 rounded-xl space-y-2">
          <div className="flex items-center gap-2">
            <SparklesIcon className="size-10 border-white border-2 rounded-lg px-1" />
            <h1 className="text-2xl md:text-4xl font-medium">
              {" "}
              Powered By AI{" "}
            </h1>
          </div>
          <p className="md:text-2xl">
            Scan options chains and trading data, detect arbitrage
            opportunities, generate pre-filled strategy cards, and assign them
            to crates that users can open.
          </p>
        </article>
      </section>

      <section id="faqs" className="flex flex-col gap-2">
        <p className="border border-blue-600/80 rounded-full w-fit px-4 py-2 text-sm bg-radial from-transparent from-20% to-blue-600/80">
          FAQS
        </p>
        <h1 className="text-4xl md:text-5xl font-bold">
          Frequently Asked Questions?
        </h1>

        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-lg md:text-2xl">
              How are the trades generated
            </AccordionTrigger>
            <AccordionContent className="md:text-lg">
              The trades are generated through our custom AI using realtime
              market data.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger className="text-lg md:text-2xl">
              What is Hedging?
            </AccordionTrigger>
            <AccordionContent className="md:text-lg">
              Hedging is the act of taking a second position in the market to
              reduce or offset the risk of your primary position.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger className="text-lg md:text-2xl">
              What is Arbitrage?
            </AccordionTrigger>
            <AccordionContent className="md:text-lg">
              Arbitrage is the act of buying and selling the same asset in
              different forms or markets to profit from price differences
              without taking on risks.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger className="text-lg md:text-2xl">
              What is Hedge Crates?
            </AccordionTrigger>
            <AccordionContent className="md:text-lg">
              Hedge Crates is a gamified trading tool that delivers arbitrage
              strategies in the form of unlockable collectible digital "crates".
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger className="text-lg md:text-2xl">
              What do the crate types represent?
            </AccordionTrigger>
            <AccordionContent className="md:text-lg">
              Each crate represents the type of arbitrage, difficulty, and risk
              level you want. Common has the least risk and is the easiest to
              understand. Epic is the most risky while being the most difficult
              to understand. Rare is a combination of both Common and Epic.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
      <Footer />
    </main>
  );
}
