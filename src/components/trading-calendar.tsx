"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface TradingDay {
  day: number;
  amount: number;
  trades: number;
  performance: "good" | "bad" | "neutral";
}

export interface TradingCalendarProps {
  data: TradingDay[];
  month: string;
  year: number;
  onDayClick?: (day: number) => void;
  onMonthChange?: (direction: "prev" | "next") => void;
}

const getPerformanceColor = (performance: string) => {
  switch (performance) {
    case "good":
      return "bg-emerald-500/80 hover:bg-emerald-500 active:bg-emerald-600";
    case "bad":
      return "bg-red-500/80 hover:bg-red-500 active:bg-red-600";
    default:
      return "bg-slate-600/80 hover:bg-slate-600 active:bg-slate-700";
  }
};

const formatAmount = (amount: number) => {
  if (amount >= 1000) {
    return `$${(amount / 1000).toFixed(1)}k`;
  }
  return `$${amount.toFixed(0)}`;
};

const getFirstDayOfMonth = (month: string, year: number) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthIndex = monthNames.indexOf(month);
  const firstDay = new Date(year, monthIndex, 1);
  return firstDay.getDay(); // 0 = Sunday, 1 = Monday, etc.
};

export default function TradingCalendar({
  data,
  month,
  year,
  onDayClick,
  onMonthChange,
}: TradingCalendarProps) {
  const weekDays = ["MON", "TUE", "WED", "THU", "FRI"];
  const weekDaysMobile = ["M", "T", "W", "T", "F"];

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  // Calculate which day of week the month starts
  const firstDayOfMonth = new Date(year, monthNames.indexOf(month), 1);
  const dayOfWeekForFirstDay = firstDayOfMonth.getDay(); // 0 = Sun, 1 = Mon, ..., 6 = Sat

  let emptyDaysCount = 0;
  if (dayOfWeekForFirstDay === 0) { // If 1st is Sunday
    emptyDaysCount = 0; // No empty cells before the first Monday in a 5-day grid
  } else if (dayOfWeekForFirstDay === 6) { // If 1st is Saturday
    emptyDaysCount = 0; // No empty cells before the first Monday in a 5-day grid
  } else { // Monday to Friday
    emptyDaysCount = dayOfWeekForFirstDay - 1; // Mon=0, Tue=1, ..., Fri=4
  }
  const emptyDays = Array(emptyDaysCount).fill(null);

  const daysInMonth = new Date(year, monthNames.indexOf(month) + 1, 0).getDate();
  const allDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const filteredDays = allDays.filter(day => {
    const date = new Date(year, monthNames.indexOf(month), day);
    const dayOfWeek = date.getDay();
    return dayOfWeek !== 0 && dayOfWeek !== 6; // Filter out Sunday (0) and Saturday (6)
  });

  const handleDayClick = (day: number) => {
    if (onDayClick) {
      onDayClick(day);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-4 sm:mb-6 px-2">
        <h1 className="text-xl sm:text-2xl font-semibold text-white">
          {month} {year}
        </h1>
        <div className="flex items-center space-x-1 sm:space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onMonthChange?.("prev")}
            className="h-8 w-8 sm:h-9 sm:w-9 p-0"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onMonthChange?.("next")}
            className="h-8 w-8 sm:h-9 sm:w-9 p-0"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-slate-900/50 rounded-lg p-2 sm:p-4">
        {/* Week Day Headers */}
        <div className="grid grid-cols-5 gap-1 sm:gap-2 mb-2 sm:mb-4">
          {weekDays.map((day, index) => (
            <div
              key={day}
              className="text-center text-slate-400 font-medium py-1 sm:py-2"
            >
              <span className="hidden sm:inline">{day}</span>
              <span className="sm:hidden text-xs">{weekDaysMobile[index]}</span>
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-5 gap-1 sm:gap-2">
          {/* Empty days for month start alignment */}
          {emptyDays.map((_, index) => (
            <div key={`empty-${index}`} className="aspect-square" />
          ))}

          {/* All days of the month */}
          {filteredDays.map((day) => {
            const dayData = data.find(d => d.day === day) || { day, amount: 0, trades: 0, performance: 'neutral' };

            return (
              <div
                key={dayData.day}
                className={`aspect-square rounded-md sm:rounded-lg p-6 transition-all duration-200 ${getPerformanceColor(
                  dayData.performance
                )} cursor-pointer touch-manipulation`}
                onClick={() => handleDayClick(dayData.day)}
              >
                <div className="h-full flex flex-col justify-between text-sm sm:text-base">
                  <div className="font-semibold text-white text-center sm:text-left">
                    {dayData.day.toString().padStart(2, "0")}
                  </div>
                  <div className="text-center flex-1 flex flex-col justify-center">
                    <div className="font-medium text-white leading-tight text-base sm:text-lg">
                      {formatAmount(dayData.amount)}
                    </div>
                    <div className="text-xs sm:text-sm text-white/80 leading-tight">
                      {dayData.trades} trades
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mt-4 sm:mt-6 text-xs sm:text-sm px-2">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 sm:w-4 sm:h-4 bg-emerald-500 rounded"></div>
          <span className="text-slate-300">Profitable</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 sm:w-4 sm:h-4 bg-red-500 rounded"></div>
          <span className="text-slate-300">Loss</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 sm:w-4 sm:h-4 bg-slate-600 rounded"></div>
          <span className="text-slate-300">Neutral</span>
        </div>
      </div>
    </div>
  );
}
