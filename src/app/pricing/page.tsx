"use client";

import { useState } from "react";
import { CheckCircle2Icon, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";
export default function PricingSection() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annually">(
    "monthly"
  );

  const pricingData = {
    monthly: [
      {
        title: "Starter",
        price: "$29.99",
        period: "/mo",
        features: [
          "30 Credits a month",
          "Common Crates only",
          "Client Section",
        ],
        cta: "Start Now",
        footer: "Our Crates, Your Trades",
      },
      {
        title: "Professional",
        price: "$149.99",
        period: "/mo",
        features: [
          "Unlimited Credits",
          "All Crate Strategies",
          "High Confidence Crates",
        ],
        cta: "Start Now",
        footer: "",
      },
    ],
    annually: [
      {
        title: "Starter",
        price: "$23.99",
        period: "/mo",
        yearlyPrice: "$287.88/year",
        savings: "You save $72 a year",
        features: ["30 Credits a month", "Common Crates only", "Dashboard"],
        cta: "Start Now",
        footer: "Our Crates, Your Trades",
      },
      {
        title: "Professional",
        price: "$119.99",
        period: "/mo",
        yearlyPrice: "$1,439.88",
        savings: "You save $360 a year",
        features: [
          "Unlimited Credits",
          "All Crate Strategies",
          "High Confidence Crates",
        ],
        cta: "Start Now",
        footer: "",
      },
    ],
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">
          Turn DATA into DOLLARS with Hedge Crates
        </h1>

        <div className="flex items-center justify-center gap-3 mb-2">
          <span
            className={cn(
              "text-base",
              billingCycle === "monthly" ? "font-semibold" : "text-gray-500"
            )}
          >
            Monthly
          </span>
          <Switch
            checked={billingCycle === "annually"}
            onCheckedChange={(checked) =>
              setBillingCycle(checked ? "annually" : "monthly")
            }
            className="data-[state=checked]:bg-blue-600 dark"
          />
          <span
            className={cn(
              "text-base",
              billingCycle === "annually" ? "font-semibold" : "text-gray-500"
            )}
          >
            Annually
          </span>
          {billingCycle === "annually" && (
            <span className="bg-blue-700 text-blue-100 text-xs font-medium px-2 py-1 rounded">
              Save 20% with Annually
            </span>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {pricingData[billingCycle].map((plan, index) => (
          <Card
            key={index}
            className="border-2 flex flex-col dark min-h-[450px]"
          >
            <CardHeader className="pb-2">
              <h2 className="text-2xl font-bold">{plan.title}</h2>
              <div className="mt-2">
                <span className="text-3xl font-bold">{plan.price}</span>
                <span className="text-gray-500">{plan.period}</span>
                {billingCycle === "annually" && (
                  <div className="mt-1 text-sm text-gray-600">
                    {plan.yearlyPrice}
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              {billingCycle === "annually" && plan.savings && (
                <div className="mb-4 bg-neutral-950 text-blue-50 p-2 rounded-md flex items-center gap-2 text-sm">
                  <Info size={16} />
                  <span>{plan.savings}</span>
                </div>
              )}
              <ul className="space-y-2">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2Icon className="stroke-blue-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="flex flex-col items-stretch gap-4 pt-4">
              <Button size="lg" className="w-full">
                {plan.cta}
              </Button>
              <div className="flex justify-between items-center">
                <div className="text-center text-sm text-gray-500">
                  Our Crates, Your Trades
                </div>

                <Image
                  src="/images/logo.png"
                  width={496}
                  height={549}
                  alt="logo"
                  className="h-6 w-fit"
                />
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
