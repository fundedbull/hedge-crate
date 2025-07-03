import {
  bigint,
  decimal,
  index,
  int,
  json,
  singlestoreEnum,
  singlestoreTableCreator,
  text,
  timestamp,
} from "drizzle-orm/singlestore-core";

export const createTable = singlestoreTableCreator(
  (name) => `hedge_crates_${name}`
);

export const usersTable = createTable(
  "users_table",
  {
    id: bigint("id", { mode: "number", unsigned: true })
      .primaryKey()
      .autoincrement(),
    clerkId: text("clerk_id").notNull(),
    credits: int("credits").notNull().default(0),
    tier: singlestoreEnum("tier", ["no_tier", "free_tier", "pro_tier"])
      .notNull()
      .default("free_tier"),
    subscribedAt: timestamp("subscribed_at").defaultNow().notNull(),
    joinedAt: timestamp("joined_at").defaultNow().notNull(),
  },
  (t) => {
    return [index("clerk_id_index").on(t.clerkId)];
  }
);

export type User = typeof usersTable.$inferSelect;

export const cardsTable = createTable(
  "cards_table",
  {
    id: bigint("id", { mode: "number", unsigned: true })
      .primaryKey()
      .autoincrement(),
    userId: bigint("user_id", { mode: "number", unsigned: true }).notNull(),
    ticker: text("ticker").notNull(),
    strike: decimal("strike", { precision: 10, scale: 2 }).notNull(),
    expiration: text("expiration").notNull(), // or date("expiration") if you prefer date type
    contract: text("contract").notNull(),
    contractsToSell: int("contracts_to_sell").notNull(),
    premiumPerContract: decimal("premium_per_contract", {
      precision: 10,
      scale: 2,
    }).notNull(),
    totalPremiumIncome: decimal("total_premium_income", {
      precision: 10,
      scale: 2,
    }).notNull(),
    cashRequired: decimal("cash_required", {
      precision: 10,
      scale: 2,
    }).notNull(),
    annualizedYield: decimal("annualized_yield", {
      precision: 10,
      scale: 4,
    }).notNull(),
    breakEvenPrice: decimal("break_even_price", {
      precision: 10,
      scale: 2,
    }).notNull(),
    setupPlan: text("setup_plan").notNull(),
    exitPlan: json("exit_plan").$type<Record<string, string>>().notNull(),
    riskAssessment: text("risk_assessment").notNull(),
    reasoning: text("reasoning").notNull(),
    rarity: singlestoreEnum("rarity", ["common", "rare", "epic"]).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => {
    return [index("user_id_index").on(t.userId)];
  }
);

export type Card = typeof cardsTable.$inferSelect;

export const creditsTransactionTable = createTable(
  "credits_transaction_table",
  {
    id: bigint("id", { mode: "number", unsigned: true })
      .primaryKey()
      .autoincrement(),
    userId: bigint("user_id", { mode: "number", unsigned: true }).notNull(),
    amount: int("amount").notNull(),
    type: singlestoreEnum("type", [
      "purchase",
      "reward",
      "crate_open",
      "other",
    ]).notNull(),
    cardId: bigint("card_id", { mode: "number", unsigned: true }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => {
    return [index("user_id_index").on(t.userId)];
  }
);

export type CreditsTransaction = typeof creditsTransactionTable.$inferInsert;

export const tradesTable = createTable(
  "calendar_table",
  {
    id: bigint("id", { mode: "number", unsigned: true })
      .primaryKey()
      .autoincrement(),
    userId: bigint("user_id", { mode: "number", unsigned: true }).notNull(),
    trades: int("trades").notNull(),
    income: decimal("income", { precision: 10, scale: 2 }).notNull(),
    sentiment: singlestoreEnum("sentiment", [
      "negative",
      "neutral",
      "positive",
    ]).notNull(),
    notes: text("notes"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => {
    return [index("user_id_index").on(t.userId)];
  }
);

export type Trade = typeof tradesTable.$inferSelect;
