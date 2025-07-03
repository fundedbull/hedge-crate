"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar, Clock, TrendingUp, AlertCircle } from "lucide-react";

interface EconomicEvent {
  time: string;
  currency: string;
  flag: string;
  event: string;
  impact: "high" | "medium" | "low";
  actual?: string;
  forecast?: string;
  previous?: string;
  headline: string;
  summary: string;
  details: string;
}

export default function FinancialDashboard() {
  const [selectedEvent, setSelectedEvent] = useState<EconomicEvent | null>(
    null
  );

  const economicEvents = [
    {
      date: "Wednesday, June 4th",
      events: [
        {
          time: "3:55 AM",
          currency: "EUR",
          flag: "🇪🇺",
          event: "HICP Composite PMI (Germany)",
          impact: "medium" as const,
          actual: "52.4",
          forecast: "52.2",
          previous: "51.8",
          headline: "German PMI Shows Continued Economic Expansion",
          summary:
            "Germany's composite PMI exceeded expectations, signaling sustained economic growth in the eurozone's largest economy.",
          details:
            "The HICP Composite PMI for Germany came in at 52.4, beating the forecast of 52.2 and showing improvement from the previous reading of 51.8. This indicates continued expansion in both manufacturing and services sectors, with new orders rising and employment levels stabilizing. The reading suggests resilience in the German economy despite global headwinds.",
        },
        {
          time: "4:00 AM",
          currency: "EUR",
          flag: "🇪🇺",
          event: "HICP Composite PMI",
          impact: "high" as const,
          actual: "53.1",
          forecast: "52.5",
          previous: "52.0",
          headline: "Eurozone PMI Surges Above Expectations",
          summary:
            "The eurozone composite PMI jumped to 53.1, indicating robust economic activity across the region.",
          details:
            "The eurozone's composite PMI reading of 53.1 significantly exceeded the forecast of 52.5, marking the strongest performance in six months. Both manufacturing and services sectors contributed to the improvement, with services leading the charge. This suggests the eurozone economy is gaining momentum heading into the summer months.",
        },
        {
          time: "8:15 AM",
          currency: "USD",
          flag: "🇺🇸",
          event: "ADP Employment Change",
          impact: "high" as const,
          actual: "+192K",
          forecast: "+175K",
          previous: "+184K",
          headline: "US Private Payrolls Beat Expectations in June",
          summary:
            "ADP employment data shows stronger than expected job growth, adding 192K positions in June.",
          details:
            "The ADP Employment Change report revealed that private sector employment increased by 192,000 jobs in June, surpassing the forecast of 175,000. This marks a solid pace of hiring, with gains concentrated in professional services and healthcare sectors. The data suggests continued labor market strength ahead of the official NFP release.",
        },
        {
          time: "8:30 AM",
          currency: "USD",
          flag: "🇺🇸",
          event: "Fed's Bostic speech",
          impact: "medium" as const,
          headline: "Fed's Bostic Signals Cautious Approach to Rate Cuts",
          summary:
            "Atlanta Fed President Bostic emphasized data-dependent policy decisions in his latest remarks.",
          details:
            "Federal Reserve Bank of Atlanta President Raphael Bostic delivered remarks emphasizing the importance of incoming economic data in shaping monetary policy decisions. He noted that while inflation has shown signs of cooling, the Fed remains committed to achieving its 2% target before considering significant policy changes.",
        },
        {
          time: "10:00 AM",
          currency: "USD",
          flag: "🇺🇸",
          event: "ISM Services PMI",
          impact: "high" as const,
          actual: "55.3",
          forecast: "54.8",
          previous: "54.5",
          headline: "US Services Sector Shows Strong Growth",
          summary:
            "ISM Services PMI climbed to 55.3, indicating robust expansion in the services sector.",
          details:
            "The ISM Services PMI rose to 55.3 in June, beating expectations of 54.8 and showing acceleration from May's 54.5 reading. The services sector, which represents about 80% of the US economy, demonstrated strong growth with improvements in new orders, employment, and business activity.",
        },
        {
          time: "9:45 PM",
          currency: "CNY",
          flag: "🇨🇳",
          event: "Caixin Services PMI",
          impact: "medium" as const,
          actual: "51.2",
          forecast: "50.8",
          previous: "50.5",
          headline: "China Services PMI Edges Higher",
          summary:
            "Caixin Services PMI improved to 51.2, showing modest expansion in China's services sector.",
          details:
            "China's Caixin Services PMI rose to 51.2 in June, up from 50.5 in May and above the forecast of 50.8. The reading indicates continued but modest expansion in the services sector, with new business growth and employment levels showing improvement.",
        },
      ],
    },
    {
      date: "Thursday, June 5th",
      events: [
        {
          time: "3:45 AM",
          currency: "GBP",
          flag: "🇬🇧",
          event: "BoE's Greene speech",
          impact: "medium" as const,
          headline: "BoE's Greene Discusses Inflation Outlook",
          summary:
            "Bank of England Deputy Governor Greene addressed current inflation trends and monetary policy stance.",
          details:
            "Bank of England Deputy Governor Megan Greene delivered remarks on the current inflation environment and the central bank's approach to monetary policy. She highlighted the importance of monitoring core inflation measures and wage growth in determining future policy decisions.",
        },
        {
          time: "8:15 AM",
          currency: "EUR",
          flag: "🇪🇺",
          event: "Deposit Facility Rate & ECB Interest Rate Decision",
          impact: "high" as const,
          actual: "3.75%",
          forecast: "3.75%",
          previous: "4.00%",
          headline: "ECB Cuts Rates by 25 Basis Points",
          summary:
            "The European Central Bank reduced its key interest rate to 3.75% as expected.",
          details:
            "The ECB announced a 25 basis point cut to its deposit facility rate, bringing it to 3.75%. The decision was widely anticipated by markets and reflects the central bank's assessment that inflation is moving toward its 2% target while economic growth remains subdued.",
        },
      ],
    },
    {
      date: "Friday, June 6th",
      events: [
        {
          time: "8:30 AM",
          currency: "USD",
          flag: "🇺🇸",
          event: "Average Hourly Earnings",
          impact: "high" as const,
          actual: "+0.4%",
          forecast: "+0.3%",
          previous: "+0.2%",
          headline: "US Wage Growth Accelerates in June",
          summary:
            "Average hourly earnings rose 0.4% month-over-month, exceeding expectations.",
          details:
            "Average hourly earnings increased by 0.4% in June, surpassing the forecast of 0.3% and accelerating from May's 0.2% gain. On an annual basis, wage growth reached 4.1%, indicating continued strength in the labor market and potential inflationary pressures.",
        },
      ],
    },
  ];

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "bg-red-600";
      case "medium":
        return "bg-yellow-600";
      case "low":
        return "bg-green-600";
      default:
        return "bg-gray-600";
    }
  };

  const getImpactIcon = (impact: string) => {
    switch (impact) {
      case "high":
        return <AlertCircle className="w-4 h-4" />;
      case "medium":
        return <TrendingUp className="w-4 h-4" />;
      case "low":
        return <Calendar className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Main Content */}
      <main className="p-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Economic Calendar</h2>

          <div className="space-y-8">
            {economicEvents.map((day, dayIndex) => (
              <div key={dayIndex} className=" rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-6 text-gray-200 flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  {day.date}
                </h3>
                <div className="space-y-3">
                  {day.events.map((event, eventIndex) => (
                    <div
                      key={eventIndex}
                      className="flex items-center space-x-4 p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer group"
                      onClick={() => setSelectedEvent(event)}
                    >
                      <div className="text-sm text-gray-400 w-20 flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {event.time}
                      </div>

                      <div className="flex items-center space-x-3">
                        <span className="text-xl">{event.flag}</span>
                        <Badge
                          variant="secondary"
                          className="text-xs bg-gray-700 text-gray-200"
                        >
                          {event.currency}
                        </Badge>
                        <div
                          className={`w-2 h-2 rounded-full ${getImpactColor(
                            event.impact
                          )}`}
                        ></div>
                      </div>

                      <div className="flex-1">
                        <div className="text-sm font-medium group-hover:text-blue-400 transition-colors">
                          {event.event}
                        </div>
                        {event.actual && (
                          <div className="text-xs text-gray-400 mt-1">
                            Actual: {event.actual} | Forecast: {event.forecast}{" "}
                            | Previous: {event.previous}
                          </div>
                        )}
                      </div>

                      <div className="text-gray-400 group-hover:text-white transition-colors">
                        {getImpactIcon(event.impact)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Event Details Dialog */}
      <Dialog
        open={!!selectedEvent}
        onOpenChange={() => setSelectedEvent(null)}
      >
        <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-white">
              {selectedEvent?.headline}
            </DialogTitle>
          </DialogHeader>

          {selectedEvent && (
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-3 bg-gray-800 rounded-lg">
                <span className="text-2xl">{selectedEvent.flag}</span>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="bg-gray-700">
                    {selectedEvent.currency}
                  </Badge>
                  <div
                    className={`w-3 h-3 rounded-full ${getImpactColor(
                      selectedEvent.impact
                    )}`}
                  ></div>
                  <span className="text-sm text-gray-400 capitalize">
                    {selectedEvent.impact} Impact
                  </span>
                </div>
                <div className="text-sm text-gray-400">
                  {selectedEvent.time}
                </div>
              </div>

              {selectedEvent.actual && (
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-gray-800 p-3 rounded-lg text-center">
                    <div className="text-xs text-gray-400">Actual</div>
                    <div className="text-lg font-bold text-green-400">
                      {selectedEvent.actual}
                    </div>
                  </div>
                  <div className="bg-gray-800 p-3 rounded-lg text-center">
                    <div className="text-xs text-gray-400">Forecast</div>
                    <div className="text-lg font-bold text-yellow-400">
                      {selectedEvent.forecast}
                    </div>
                  </div>
                  <div className="bg-gray-800 p-3 rounded-lg text-center">
                    <div className="text-xs text-gray-400">Previous</div>
                    <div className="text-lg font-bold text-gray-400">
                      {selectedEvent.previous}
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-gray-200 mb-2">Summary</h4>
                  <p className="text-gray-300 text-sm">
                    {selectedEvent.summary}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-200 mb-2">Details</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {selectedEvent.details}
                  </p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
