import {
  bigint,
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
    difficulty: singlestoreEnum("difficulty", [
      "easy",
      "intermediate",
      "hard",
    ]).notNull(),
    setup: json("setup").$type<string[]>().notNull().default([]),
    exitPlan: json("exit_plan").$type<string[]>().notNull().default([]),
    instrument: text("instrument").notNull(),
    strategy: text("strategy").notNull(),
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
