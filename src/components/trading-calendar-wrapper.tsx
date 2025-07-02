'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import TradingCalendar, { TradingDay } from './trading-calendar';

export default function TradingCalendarWrapper({ 
  initialData,
  initialMonth,
  initialYear,
}: {
  initialData: TradingDay[];
  initialMonth: string;
  initialYear: number;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleMonthChange = (direction: 'prev' | 'next') => {
    const month = searchParams.get('month') ? parseInt(searchParams.get('month')!) : new Date().getMonth() + 1;
    const year = searchParams.get('year') ? parseInt(searchParams.get('year')!) : new Date().getFullYear();

    let newMonth = month;
    let newYear = year;

    if (direction === 'prev') {
      if (month === 1) {
        newMonth = 12;
        newYear = year - 1;
      } else {
        newMonth = month - 1;
      }
    } else {
      if (month === 12) {
        newMonth = 1;
        newYear = year + 1;
      } else {
        newMonth = month + 1;
      }
    }
    router.push(`/client/dashboard/trades?year=${newYear}&month=${newMonth}`);
  };

  return (
    <TradingCalendar 
      data={initialData} 
      month={initialMonth} 
      year={initialYear} 
      onMonthChange={handleMonthChange} 
    />
  );
}