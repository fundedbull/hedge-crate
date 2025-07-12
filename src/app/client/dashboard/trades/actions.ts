"use server";

import { db } from "@/server/db";
import { tradesTable } from "@/server/db/schema";
import { QUERIES } from "@/server/db/queries";
import { auth } from "@clerk/nextjs/server";
import { and, eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function upsertTrade(formData: {
  income: number;
  trades: number;
  sentiment: "positive" | "neutral" | "negative";
  notes: string;
  day: number;
  month: number;
  year: number;
}) {
  const session = await auth();
  if (!session.userId) {
    throw new Error("Not authenticated");
  }

  const [user] = await QUERIES.getUserByClerkId(session.userId);
  if (!user) {
    throw new Error("User not found");
  }

  const { income, trades, sentiment, notes, day, month, year } = formData;
  const tradeDate = new Date(year, month - 1, day);

  const existingTrade = await db
    .select()
    .from(tradesTable)
    .where(
      and(
        eq(tradesTable.userId, user.id),
        sql`DATE(created_at) = DATE(${tradeDate})`
      )
    );

  if (existingTrade.length > 0) {
    await db
      .update(tradesTable)
      .set({
        income: income.toString(),
        trades,
        sentiment,
        notes,
      })
      .where(eq(tradesTable.id, existingTrade[0].id));
  } else {
    await db.insert(tradesTable).values({
      userId: user.id,
      income: income.toString(),
      trades,
      sentiment,
      notes,
      createdAt: tradeDate,
    });
  }

  revalidatePath("/client/dashboard/trades");
}
