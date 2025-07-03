"use client";
import { useRouter, useSearchParams } from "next/navigation";
import TradingCalendar, { TradingDay } from "./trading-calendar";
import { useState } from "react";
import { TradeEntryDialog } from "./trade-entry-dialog";
import { Trade } from "@/server/db/schema";

export default function TradingCalendarWrapper({
  initialData,
  initialMonth,
  initialYear,
  initialTrades,
}: {
  initialData: TradingDay[];
  initialMonth: string;
  initialYear: number;
  initialTrades: Trade[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedTrade, setSelectedTrade] = useState<Trade | null>(null);

  const currentMonth = searchParams.get("month")
    ? parseInt(searchParams.get("month")!)
    : new Date().getMonth() + 1;
  const currentYear = searchParams.get("year")
    ? parseInt(searchParams.get("year")!)
    : new Date().getFullYear();

  const handleMonthChange = (direction: "prev" | "next") => {
    let newMonth = currentMonth;
    let newYear = currentYear;

    if (direction === "prev") {
      if (currentMonth === 1) {
        newMonth = 12;
        newYear = currentYear - 1;
      } else {
        newMonth = currentMonth - 1;
      }
    } else {
      if (currentMonth === 12) {
        newMonth = 1;
        newYear = currentYear + 1;
      } else {
        newMonth = currentMonth + 1;
      }
    }
    router.push(`/client/dashboard/trades?year=${newYear}&month=${newMonth}`);
  };

  const handleDayClick = (day: number) => {
    setSelectedDay(day);
    const tradeForDay = initialTrades.find(
      (trade) => trade.createdAt.getDate() === day
    );
    setSelectedTrade(tradeForDay || null);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedDay(null);
    setSelectedTrade(null);
  };

  return (
    <>
      <TradingCalendar
        data={initialData}
        month={initialMonth}
        year={initialYear}
        onMonthChange={handleMonthChange}
        onDayClick={handleDayClick}
      />
      {selectedDay && (
        <TradeEntryDialog
          isOpen={isDialogOpen}
          onClose={handleCloseDialog}
          day={selectedDay}
          month={currentMonth}
          year={initialYear}
          trade={selectedTrade}
        />
      )}
    </>
  );
}
