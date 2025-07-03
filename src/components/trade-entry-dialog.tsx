"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { upsertTrade } from "@/app/client/dashboard/trades/actions";
import { Trade } from "@/server/db/schema";

interface TradeEntryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  day: number;
  month: number;
  year: number;
  trade: Trade | null;
}

export function TradeEntryDialog({
  isOpen,
  onClose,
  day,
  month,
  year,
  trade,
}: TradeEntryDialogProps) {
  const [income, setIncome] = useState("");
  const [trades, setTrades] = useState("");
  const [sentiment, setSentiment] = useState<
    "positive" | "neutral" | "negative"
  >("neutral");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (trade) {
      setIncome(trade.income || "");
      setTrades(trade.trades.toString());
      setSentiment(trade.sentiment || "neutral");
      setNotes(trade.notes || "");
    } else {
      setIncome("");
      setTrades("");
      setSentiment("neutral");
      setNotes("");
    }
  }, [trade]);

  const handleSubmit = async () => {
    await upsertTrade({
      income: parseFloat(income),
      trades: parseInt(trades),
      sentiment,
      notes,
      day,
      month,
      year,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="dark">
        <DialogHeader>
          <DialogTitle>
            Log Trade for {month}/{day}/{year}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="income">Income</Label>
            <Input
              id="income"
              type="number"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="trades">Trades</Label>
            <Input
              id="trades"
              type="number"
              value={trades}
              onChange={(e) => setTrades(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="sentiment">Sentiment</Label>
            <Select
              onValueChange={(value: "positive" | "neutral" | "negative") =>
                setSentiment(value)
              }
              value={sentiment}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select sentiment" />
              </SelectTrigger>
              <SelectContent className="dark">
                <SelectItem value="positive">Positive</SelectItem>
                <SelectItem value="neutral">Neutral</SelectItem>
                <SelectItem value="negative">Negative</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
          <Button onClick={handleSubmit}>Submit</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
