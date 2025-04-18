"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

// Update the stock/index data type to include an image
interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  imageUrl?: string; // Optional image URL for the stock/index logo
}

interface StockTickerProps {
  stocks: StockData[];
  speed?: "slow" | "normal" | "fast";
  className?: string;
  pauseOnHover?: boolean;
}

export function StockTicker({
  stocks,
  speed = "normal",
  className,
  pauseOnHover = true,
}: StockTickerProps) {
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Determine animation duration based on speed
  const getDuration = () => {
    switch (speed) {
      case "slow":
        return 60;
      case "fast":
        return 20;
      case "normal":
      default:
        return 30;
    }
  };

  // Format price to 2 decimal places
  const formatPrice = (price: number) => {
    return price.toFixed(2);
  };

  // Format change percentage
  const formatChangePercent = (percent: number) => {
    return percent.toFixed(2);
  };

  // Handle resize to restart animation when window size changes
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const container = containerRef.current;
        container.style.animationPlayState = "running";

        // Restart animation
        container.style.animation = "none";
        void container.offsetWidth; // Trigger reflow
        container.style.animation = `scroll ${getDuration()}s linear infinite`;

        if (isPaused) {
          container.style.animationPlayState = "paused";
        }
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isPaused]);

  return (
    <div
      className={cn(
        "relative flex w-full overflow-hidden bg-black text-white",
        className
      )}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
      onFocus={() => pauseOnHover && setIsPaused(true)}
      onBlur={() => pauseOnHover && setIsPaused(false)}
      aria-label="Financial ticker"
    >
      <style jsx global>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>

      <div
        ref={containerRef}
        className="flex min-w-full shrink-0 animate-scroll items-center gap-6 py-4"
        style={{
          animation: `scroll ${getDuration()}s linear infinite`,
          animationPlayState: isPaused ? "paused" : "running",
        }}
      >
        {/* First set of stocks */}
        {stocks.map((stock, index) => (
          <div
            key={`stock-${index}`}
            className="flex items-center gap-2 whitespace-nowrap px-3 py-2"
          >
            {stock.imageUrl && (
              <div className="flex items-center justify-center size-20 overflow-hidden rounded-full ">
                <Image
                  src={stock.imageUrl || "/placeholder.svg"}
                  alt={`${stock.name} logo`}
                  width={64}
                  height={64}
                  className="h-full w-full object-fill"
                />
              </div>
            )}
            <span className="font-bold text-white">{stock.symbol}</span>
            <span className="text-gray-300">{formatPrice(stock.price)}</span>
            <span
              className={cn(
                "flex items-center gap-1",
                stock.change > 0
                  ? "text-green-500"
                  : stock.change < 0
                  ? "text-red-500"
                  : "text-muted-foreground"
              )}
            >
              {stock.change > 0 ? (
                <ArrowUp className="h-3 w-3" />
              ) : stock.change < 0 ? (
                <ArrowDown className="h-3 w-3" />
              ) : null}
              {formatChangePercent(stock.changePercent)}%
            </span>
          </div>
        ))}

        {/* Duplicate set of stocks for seamless looping */}
        {stocks.map((stock, index) => (
          <div
            key={`stock-duplicate-${index}`}
            className="flex items-center gap-2 whitespace-nowrap px-3 py-2"
          >
            {stock.imageUrl && (
              <div className="flex items-center justify-center size-20 overflow-hidden rounded-full ">
                <Image
                  src={stock.imageUrl || "/placeholder.svg"}
                  alt={`${stock.name} logo`}
                  width={64}
                  height={64}
                  className="h-full w-full object-fill"
                />
              </div>
            )}
            <span className="font-bold text-white">{stock.symbol}</span>
            <span className="text-gray-300">{formatPrice(stock.price)}</span>
            <span
              className={cn(
                "flex items-center gap-1",
                stock.change > 0
                  ? "text-green-500"
                  : stock.change < 0
                  ? "text-red-500"
                  : "text-muted-foreground"
              )}
            >
              {stock.change > 0 ? (
                <ArrowUp className="h-3 w-3" />
              ) : stock.change < 0 ? (
                <ArrowDown className="h-3 w-3" />
              ) : null}
              {formatChangePercent(stock.changePercent)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
