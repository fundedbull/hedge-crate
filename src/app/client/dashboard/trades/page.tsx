import TradingCalendarWrapper from "@/components/trading-calendar-wrapper";
import { QUERIES } from "@/server/db/queries";
import { auth } from "@clerk/nextjs/server";

export default async function TradesPage({
  searchParams,
}: {
  searchParams: Promise<{ year?: string; month?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const session = await auth();
  const [user] = await QUERIES.getUserByClerkId(session.userId!);

  const year = resolvedSearchParams?.year
    ? parseInt(resolvedSearchParams.year)
    : new Date().getFullYear();
  const month = resolvedSearchParams?.month
    ? parseInt(resolvedSearchParams.month)
    : new Date().getMonth() + 1;

  const trades = await QUERIES.getTradesByUserIdForMonth(user.id, year, month);
  const daysInMonth = new Date(year, month, 0).getDate();

  const tradesByDay = trades.reduce((acc, trade) => {
    const day = trade.createdAt.getDate();
    if (!acc[day]) {
      acc[day] = { day, trades: 0, amount: 0, performance: "neutral" };
    }
    acc[day].trades += trade.trades;
    acc[day].amount += parseFloat(trade.income);

    // Determine performance based on sentiment
    switch (trade.sentiment) {
      case "positive":
        acc[day].performance = "good";
        break;
      case "negative":
        acc[day].performance = "bad";
        break;
      default:
        acc[day].performance = "neutral";
    }

    return acc;
  }, {} as Record<number, { day: number; trades: number; amount: number; performance: "good" | "neutral" | "bad" }>);

  const data = Array.from({ length: daysInMonth }, (_, i) => {
    const day = i + 1;
    return (
      tradesByDay[day] || { day, trades: 0, amount: 0, performance: "neutral" }
    );
  });

  const monthName = new Date(year, month - 1).toLocaleString("default", {
    month: "long",
  });

  return (
    <div className="p-4">
      <TradingCalendarWrapper
        initialData={data}
        initialMonth={monthName}
        initialYear={year}
        initialTrades={trades}
      />
    </div>
  );
}
