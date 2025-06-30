import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  TrendingUp,
  DollarSign,
  Calendar,
  Target,
  AlertTriangle,
  Lightbulb,
  FileText,
  BarChart3,
} from "lucide-react";

interface OptionsData {
  ticker: string;
  strike: number;
  expiration: string;
  contracts_to_sell: number;
  premium_per_contract: number;
  total_premium_income: number;
  cash_required: number;
  annualized_yield: number;
  break_even_price: number;
  setup_plan: string;
  exit_plan: {
    "PROFIT SCENARIO": string;
    "ASSIGNMENT SCENARIO": string;
    "EARLY EXIT": string;
    "STOP LOSS": string;
  };
  risk_assessment: string;
  reasoning: string;
}

interface OptionsTradingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: OptionsData;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);
};

const formatPercentage = (value: number) => {
  return `${value.toFixed(2)}%`;
};

export default function OptionsTradingDialog({
  open,
  onOpenChange,
  data,
}: OptionsTradingDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl md:min-w-3xl max-h-[90vh] overflow-y-auto bg-black border-gray-800 text-white">
        <div className="pb-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <DialogTitle className="text-2xl font-bold flex items-center gap-2 text-white">
                <TrendingUp className="h-6 w-6 text-green-400" />
                {data.ticker} - Ground Strike
              </DialogTitle>
              <DialogDescription className="text-gray-400 mt-1">
                Premium income strategy with {formatDate(data.expiration)}{" "}
                expiration
              </DialogDescription>
            </div>
            <Badge
              variant="outline"
              className="bg-green-900 text-green-300 border-green-600"
            >
              {formatPercentage(data.annualized_yield)} APY
            </Badge>
          </div>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-gray-900 border-gray-800">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-black text-white"
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="exit-strategy"
              className="data-[state=active]:bg-black text-white"
            >
              <Target className="h-4 w-4 mr-2" />
              Strategy
            </TabsTrigger>
            <TabsTrigger
              value="risk-analysis"
              className="data-[state=active]:bg-black text-white"
            >
              <AlertTriangle className="h-4 w-4 mr-2" />
              Analysis
            </TabsTrigger>
            <TabsTrigger
              value="contract-details"
              className="data-[state=active]:bg-black text-white"
            >
              <FileText className="h-4 w-4 mr-2" />
              Details
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Target className="h-4 w-4 text-blue-400" />
                  <span className="text-sm text-gray-400">Strike Price</span>
                </div>
                <p className="text-xl font-semibold">
                  {formatCurrency(data.strike)}
                </p>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-1">
                  <DollarSign className="h-4 w-4 text-green-400" />
                  <span className="text-sm text-gray-400">Premium Income</span>
                </div>
                <p className="text-xl font-semibold text-green-400">
                  ~{formatCurrency(data.total_premium_income)}
                </p>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="h-4 w-4 text-purple-400" />
                  <span className="text-sm text-gray-400">Break Even</span>
                </div>
                <p className="text-xl font-semibold">
                  ~{formatCurrency(data.break_even_price)}
                </p>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-1">
                  <DollarSign className="h-4 w-4 text-orange-400" />
                  <span className="text-sm text-gray-400">Cash Required</span>
                </div>
                <p className="text-xl font-semibold">
                  {formatCurrency(data.cash_required)}
                </p>
              </div>
            </div>

            <Separator className="bg-gray-800" />

            {/* Setup Plan */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-yellow-400" />
                Setup Strategy
              </h3>
              <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
                <p className="text-gray-300 leading-relaxed">
                  {data.setup_plan}
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="exit-strategy" className="space-y-4 mt-6">
            <div className="grid gap-4">
              <div className="bg-green-950/30 border border-green-800 rounded-lg p-4">
                <h4 className="font-medium text-green-300 mb-2 flex items-center gap-2">
                  💰 Profit Scenario
                </h4>
                <p className="text-gray-300 leading-relaxed">
                  {data.exit_plan["PROFIT SCENARIO"]}
                </p>
              </div>

              <div className="bg-blue-950/30 border border-blue-800 rounded-lg p-4">
                <h4 className="font-medium text-blue-300 mb-2 flex items-center gap-2">
                  📈 Assignment Scenario
                </h4>
                <p className="text-gray-300 leading-relaxed">
                  {data.exit_plan["ASSIGNMENT SCENARIO"]}
                </p>
              </div>

              <div className="bg-yellow-950/30 border border-yellow-800 rounded-lg p-4">
                <h4 className="font-medium text-yellow-300 mb-2 flex items-center gap-2">
                  ⚡ Early Exit
                </h4>
                <p className="text-gray-300 leading-relaxed">
                  {data.exit_plan["EARLY EXIT"]}
                </p>
              </div>

              <div className="bg-red-950/30 border border-red-800 rounded-lg p-4">
                <h4 className="font-medium text-red-300 mb-2 flex items-center gap-2">
                  🛑 Stop Loss
                </h4>
                <p className="text-gray-300 leading-relaxed">
                  {data.exit_plan["STOP LOSS"]}
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="risk-analysis" className="space-y-6 mt-6">
            {/* Risk Assessment */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-400" />
                Risk Assessment
              </h3>
              <div className="bg-red-950/20 border border-red-900 rounded-lg p-4">
                <p className="text-gray-300 leading-relaxed">
                  {data.risk_assessment}
                </p>
              </div>
            </div>

            <Separator className="bg-gray-800" />

            {/* Reasoning */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-yellow-400" />
                Strategy Reasoning
              </h3>
              <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
                <p className="text-gray-300 leading-relaxed">
                  {data.reasoning}
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="contract-details" className="space-y-6 mt-6">
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-400" />
                Contract Specifications
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-800">
                    <span className="text-gray-400">Ticker Symbol:</span>
                    <span className="font-medium text-lg">{data.ticker}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-800">
                    <span className="text-gray-400">Strike Price:</span>
                    <span className="font-medium">
                      {formatCurrency(data.strike)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-800">
                    <span className="text-gray-400">Expiration Date:</span>
                    <span className="font-medium">
                      {formatDate(data.expiration)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-800">
                    <span className="text-gray-400">Contracts to Sell:</span>
                    <span className="font-medium">
                      {data.contracts_to_sell}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-800">
                    <span className="text-gray-400">Premium per Contract:</span>
                    <span className="font-medium">
                      {formatCurrency(data.premium_per_contract)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-800">
                    <span className="text-gray-400">Total Premium Income:</span>
                    <span className="font-medium text-green-400">
                      {formatCurrency(data.total_premium_income)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-800">
                    <span className="text-gray-400">Cash Required:</span>
                    <span className="font-medium">
                      {formatCurrency(data.cash_required)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-800">
                    <span className="text-gray-400">Annualized Yield:</span>
                    <span className="font-medium text-green-400">
                      {formatPercentage(data.annualized_yield)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
