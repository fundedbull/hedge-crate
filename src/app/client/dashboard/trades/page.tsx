import TradingCalendarWrapper from "@/components/trading-calendar-wrapper";
import { QUERIES } from "@/server/db/queries";
import { auth } from "@clerk/nextjs/server";

export default async function TradesPage({ searchParams }: { searchParams: { year?: string, month?: string } }) {
  const session = await auth();
  const [user] = await QUERIES.getUserByClerkId(session.userId!);

  const year = searchParams.year ? parseInt(searchParams.year) : new Date().getFullYear();
  const month = searchParams.month ? parseInt(searchParams.month) : new Date().getMonth() + 1;

  const crates = await QUERIES.getCratesByUserIdForMonth(user.id, year, month);
  const daysInMonth = new Date(year, month, 0).getDate();

  const tradesByDay = crates.reduce((acc, crate) => {
    const day = crate.createdAt.getDate();
    if (!acc[day]) {
      acc[day] = { day, trades: 0, amount: 0, performance: 'neutral' };
    }
    acc[day].trades++;
    acc[day].amount += parseFloat(crate.totalPremiumIncome);
    return acc;
  }, {} as Record<number, { day: number; trades: number; amount: number; performance: 'good' | 'neutral' | 'bad' }>);

  const data = Array.from({ length: daysInMonth }, (_, i) => {
    const day = i + 1;
    if (tradesByDay[day]) {
      const moods: ('good' | 'neutral' | 'bad')[] = ['good', 'neutral', 'bad'];
      tradesByDay[day].performance = moods[Math.floor(Math.random() * moods.length)];
      return tradesByDay[day];
    }
    return { day, trades: 0, amount: 0, performance: 'neutral' };
  });

  const monthName = new Date(year, month - 1).toLocaleString('default', { month: 'long' });

  return (
    <div className="p-4">
      <TradingCalendarWrapper initialData={data} initialMonth={monthName} initialYear={year} />
    </div>
  );
}
