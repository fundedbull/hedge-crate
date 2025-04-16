import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { signInRedirect } from "@/server/actions";
import {
  CalculatorIcon,
  ChartBarIcon,
  CheckCircle2Icon,
  CloudIcon,
  CreditCardIcon,
  ListFilterIcon,
  LockIcon,
  NotebookIcon,
  PackageOpenIcon,
  PhoneIcon,
  SparkleIcon,
  SparklesIcon,
  ZapIcon,
} from "lucide-react";
import Image from "next/image";

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

          <form className="max-w-xl" action={signInRedirect}>
            <Button className="w-full">Open Creates</Button>
          </form>

          <Button className="max-w-xl" asChild variant="outline">
            <a href="https://discord.gg/Rw5RR5kJeM">Join Discord</a>
          </Button>
        </article>
        <Image
          width={1024}
          height={1024}
          src="/images/hedge-crate.png"
          className="rounded-lg aspect-square md:w-xl"
          alt="decorative"
        />
        {/** Add Slider here */}
      </section>
      <section className="flex flex-col items-center gap-8 bg-gradient-to-r from-transparent from-25%% via-blue-600/20 via-50% to-transparent p-4 md:p-20">
        <h1 className="text-5xl md:text-7xl font-bold text-center">
          Turn Strategies into Skills
        </h1>
        <h1 className="text-5xl md:text-7xl font-bold text-center">
          One Crate at a Time.
        </h1>
      </section>

      <section className="flex flex-col md:justify-center md:items-center gap-4">
        <h1 className="text-5xl md:text-6xl font-bold ">Select your Crate</h1>

        <Tabs defaultValue="common" className="w-full max-w-2xl ">
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
          <Button>
            <ListFilterIcon />
            Filter
          </Button>
          <TabsContent className="w-full " value="common">
            <Image
              width={1024}
              height={1024}
              src="/images/rare-crate.png"
              className="rounded-lg"
              alt="decorative"
            />
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

      <section className="flex flex-col gap-4 py-10 ">
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

      <section className="flex flex-col gap-2">
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
    </main>
  );
}
