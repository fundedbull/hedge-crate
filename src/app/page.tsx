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
  ChartBarIcon,
  CheckCircle2Icon,
  LockIcon,
  PackageOpenIcon,
  PhoneIcon,
  ZapIcon,
} from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <main className="w-full h-fit flex flex-col gap-4 p-4 dark">
      <section className="flex flex-col md:flex-row gap-2">
        <article className="flex flex-col gap-4 ">
          <p className="border border-white/40 rounded-full w-fit px-4 py-2 text-sm bg-radial from-transparent from-20% to-white/40">
            Our Creates, Your Trades
          </p>
          <h1 className="text-5xl md:text-6xl font-bold">
            Harness the Power of AI to Abritrage Hedging.
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
      <section className="flex flex-col items-center gap-8 bg-gradient-to-r from-transparent from-25%% via-blue-600/20 via-50% to-transparent p-4">
        <h1 className="text-5xl md:text-7xl font-bold text-center">
          We took the Stress out of Trading
        </h1>
      </section>

      <section className="flex flex-col md:justify-center md:items-center gap-4">
        <div className="flex justify-between items-center">
          <p className="flex items-center gap-2 rounded-full border border-white/30 px-2 py-1 font-bold">
            <PackageOpenIcon /> Credits 0
          </p>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold ">Select your Crate</h1>

        <Tabs defaultValue="common" className="w-full max-w-2xl ">
          <TabsList className="w-full">
            <TabsTrigger value="common">Common</TabsTrigger>
            <TabsTrigger value="rare">
              <LockIcon />
              Rare
            </TabsTrigger>
            <TabsTrigger value="epic">
              <LockIcon />
              Epic
            </TabsTrigger>
          </TabsList>
          <TabsContent className="w-full " value="common">
            <Image
              width={1024}
              height={1024}
              src="/images/rare-crate.png"
              className="rounded-lg"
              alt="decorative"
            />
            <article className="bg-gradient-to-r from-transparent from-25%% via-blue-600/20 via-50% to-transparent border-2 border-white/10 p-4 rounded-lg space-y-2">
              <h2 className="text-3xl md:text-5xl font-medium">Type: Common</h2>
              <p className="text-lg md:text-2xl">
                Strategy: Reversal Arbitrage
              </p>
              <p className="text-lg md:text-2xl">Difficulty: Easy</p>
              <p className="text-lg md:text-2xl">Margin Required: True</p>
              <p className="text-lg md:text-2xl">Risk Level: Medium</p>
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
            <PhoneIcon className="size-10 border-white border-2 rounded-lg px-1" />
            <h1 className="text-2xl md:text-4xl font-medium">
              {" "}
              24 Hour Support{" "}
            </h1>
          </div>
          <p className="md:text-2xl">
            Contact us via chatbot, Discord, or email at any time.
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
        </Accordion>
      </section>
    </main>
  );
}
