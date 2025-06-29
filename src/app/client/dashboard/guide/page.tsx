import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, ChevronRight } from "lucide-react";

const guideContent = [
  {
    title: "Welcome to Hedge Crates – A New Way to Learn Trading",
    paragraphs: [
      "Welcome to Hedge Crates — the first platform that turns live trading strategies into a gamified experience.",
      "Here, you're not just studying textbook theories — you're unlocking real opportunities, drawn from live market data, transformed into actionable, educational Crate Cards.",
      "Each Crate you open brings a new setup, a new lesson, and a chance to sharpen your edge.",
      "Ready to unlock your first advantage? Let’s get started.",
    ],
  },
  {
    title: "How to setup and read crate cards – Fun, Fast, and Easy",
    paragraphs: [
      "Whether you're an Experienced trader or a Trader just getting started. Hedge Crates makes trading a more friendly, safe, and unique way to earn money. First thing you want to do is on the Home Page head to the select your crate section. Here you can see an option of 3 crates. Common, Rare, and Epic.",
      "Simply Select the crate you want and then select the Filter button to Dial in more on a crate that matches your objectives and situation. Such as Ticker Symbol, Broker, Budget, and Risk Reward. Select Apply Filter and then select Generate. Our AI will scan options Chains Across your Broker to determine a setup that matches your search.",
      "You will receive that setup in the form of a Crate Card. You can see right away A Entry Setup and Exit Plan. You may use this Setup on your next trade if you would like but it is not mandatory.You will see a list of buttons on the bottom such as Save To Locker, Trade Thesis, and Disclaimer.Your Locker is a way to confirm you are taking or have taken the trade. You will be able to view your trade and track profits. Your Trade Thesis will be a brief summary of why this setup makes sense. Lastly your disclaimer is there to inform you of Potential risks, or problems you may face.",
    ],
  },
  {
    title: "What are Common, Rare, and Epic Crates– Bear Bull Hedge Strats",
    sections: [
      {
        subtitle: "Common Crate (Ground Strike)",
        content: `A Cash-Secured Put is a Neutral/Bullish options strategy where you sell a put option and set aside enough cash to buy the stock if you’re assigned. You’re essentially saying: “I’m willing to buy this stock at a lower price — and get paid upfront to wait.” You earn a credit (premium) when you sell the put. If the stock stays above the strike price, you keep the premium and no shares are assigned. If the stock falls below the strike, you’ll be required to buy it — but at a discount, thanks to the premium you collected.`,
      },
      {
        subtitle: "Rare Crate (The Skycap)",
        content: `A Covered Call is a Neutral/Bullish options Strategy where you Buy 100 Shares of an Asset then Sell a Call against that Asset. You’re essentially saying: “I’m willing to buy this stock right now at this price — and get paid upfront while I wait for the price to rise.” If the price rises great; you earn money on the shares you own plus the premium you Collected. If Price Does Nothing Then Still great because you got paid a premium up front. Worst case scenario; price decreases but the premium you were paid upfront offsets those unrealized losses.`,
      },
      {
        subtitle: "Epic Crate (The Chain Stack)",
        content: `An Extremely Bullish/Bearish Strategy where you Combine either our Common Crate, Or Rare Crate Strategy with a regular Call or Put. You’re essentially saying: “I’m willing to take some risk with a Call(Bullish), or a Put(Bearish) but I want to offset that risk Entirely by Collecting Premium from a Cash Secured Put, or Covered Call.” For Example Using our Rare Crates Strategy You get a $112 premium up front and then Buy a Call using that Premium you made from your Covered Call. Best Case Scenario, the Asset your trading Skyrockets up. You Keep the Premium from your Covered Call, plus the Value Increase from your Shares, plus the Increased Value of your Call. You make more money and the Call removes the Profit Cap from your trade. Worst Case Scenario. The Asset drops in price or stays the same. The Call expires worthless and Premium made from the Covered Call gets cancelled out by the Loss of the Call resulting in Break Even. This Can Be Performed with Cash Secured Puts as well. Using our Common Crate to which one works best for you.`,
      },
    ],
  },
  {
    title: "How to Place A Crate Trade",
    paragraphs: [
      "To place a crate trade, Load Up Your Broker on a Different Tab or device. Then select your crate, add your filter, and Press Generate. From there switch over to your broker and Find the Ticker from your crate. Go to the options Chain and Select the Strategy Our Crate uses.",
      "Select the Strike and Expiration then press Sell. Congratulations you entered a trade using Hedge Crates. Now just Wait for Expiration and Collect your Premium.",
      "This will look a little different with our Epic Crate. Remember though the only major difference is your selling a call/put and buying a call/put less or equal to the premium collected from a Cash Secured Put, or Covered Call. For example You sell a Cash Secured Put using our Groundstrike Crate, and collect $500 over 2 weeks. You then Buy a Calls worth $500 making this Play Risk free.",
    ],
  },
  {
    title: "How to Track Your Crate Progress",
    paragraphs: [
      "After Opening Each Crate your Crate and Card Details will be sent to your Crate locker. In the card Generated you can see details such as Expiration, Strike, Premium Collected, Cash Required, Annualized Yield, Strategy Profile, and Risk Disclaimers.",
    ],
  },
  {
    title: "Pro Tips When Using Hedge Crates",
    paragraphs: ["Check back soon for pro tips to enhance your trading strategies!"],
  },
];

export default function GuidePage() {
  return (
    <div className="p-4 md:p-6 space-y-8 max-w-screen md:w-full text-white">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <BookOpen className="h-8 w-8 text-blue-500" />
          Hedge Crates Guide
        </h1>
        <p className="text-lg text-neutral-400">
          Your official manual for getting started and mastering the platform.
        </p>
      </div>

      <div className="space-y-6">
        {guideContent.map((section, index) => (
          <Card key={index} className="dark bg-neutral-900/50 border-neutral-800">
            <CardHeader>
              <CardTitle className="text-xl text-neutral-100">{section.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-neutral-300 leading-relaxed space-y-4">
              {section.paragraphs?.map((paragraph, pIndex) => (
                <p key={pIndex}>{paragraph}</p>
              ))}
              {section.sections?.map((subSection, sIndex) => (
                <div key={sIndex} className="space-y-2 pt-2">
                  <h3 className="font-semibold text-lg text-neutral-100 flex items-center gap-2">
                    <ChevronRight className="h-5 w-5 text-blue-500" />
                    {subSection.subtitle}
                  </h3>
                  <p className="pl-7">{subSection.content}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
