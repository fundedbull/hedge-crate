"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import Link from "next/link";

interface UpgradeModalProps {
  currentPlan?: string;
  recommendedPlan?: string;
  featureName?: string;
  imageUrl?: string;
}

export function UpgradeModal({
  currentPlan = "Trial",
  recommendedPlan = "Professional All Features",
  featureName = "our Gamified Trading Codes",
  imageUrl = "/images/epic-crate.png",
}: UpgradeModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Some button</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md dark bg-zinc-900 text-white border-zinc-800">
        <div className="flex justify-center mb-4">
          <div className="relative w-full h-40 bg-zinc-800 rounded-md overflow-hidden">
            <Image
              src={imageUrl || "/images/epic-crate.png"}
              alt="Feature preview"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
        <DialogHeader>
          <DialogTitle className=" text-2xl font-semibold text-white">
            Get full access to {featureName}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="flex flex-col border border-zinc-700 bg-zinc-800 rounded-md p-4 relative">
            <p className="text-sm text-zinc-300 font-medium">Current Plan</p>
            <p className="text-sm font-semibold text-zinc-400">{currentPlan}</p>
          </div>

          <div className="flex flex-col border border-blue-600 bg-zinc-800 rounded-md p-4">
            <p className=" text-blue-400 font-medium">Recommended</p>
            <p className="text-sm font-semibold text-white">
              {recommendedPlan}
            </p>
          </div>
        </div>

        <div className="flex justify-center mt-4">
          <Button
            asChild
            size="lg"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Link href={"/pricing"}>Upgrade Now</Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
