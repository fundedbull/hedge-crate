import {
  bigint,
  index,
  int,
  json,
  mysqlEnum,
  mysqlTable,
  text,
  timestamp,
} from "drizzle-orm/mysql-core";

export const usersTable = mysqlTable(
  "users_table",
  {
    id: bigint("id", { mode: "number", unsigned: true })
      .primaryKey()
      .autoincrement(),
    clerkId: text("clerk_id").notNull().unique(),
    credits: int("credits").notNull().default(0),
    joinedAt: timestamp("joined_at").defaultNow().notNull(),
  },
  (t) => {
    return [index("clerk_id_index").on(t.clerkId)];
  }
);

export type User = typeof usersTable.$inferSelect;

export const cardsTable = mysqlTable(
  "cards_table",
  {
    id: bigint("id", { mode: "number", unsigned: true })
      .primaryKey()
      .autoincrement(),
    userId: bigint("user_id", { mode: "number", unsigned: true })
      .notNull()
      .references(() => usersTable.id),
    difficulty: mysqlEnum("difficulty", [
      "easy",
      "intermediate",
      "hard",
    ]).notNull(),
    setup: json("setup").$type<string[]>().notNull().default([]),
    exitPlan: json("exit_plan").$type<string[]>().notNull().default([]),
    instrument: text("instrument").notNull(),
    strategy: text("strategy").notNull(),
    rarity: mysqlEnum("rarity", ["common", "rare", "epic"]).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => {
    return [index("user_id_index").on(t.userId)];
  }
);

export type Card = typeof cardsTable.$inferSelect;

export const creditsTransactionTable = mysqlTable(
  "credits_transaction_table",
  {
    id: bigint("id", { mode: "number", unsigned: true })
      .primaryKey()
      .autoincrement(),
    userId: bigint("user_id", { mode: "number", unsigned: true })
      .notNull()
      .references(() => usersTable.id),
    amount: int("amount").notNull(),
    type: mysqlEnum("type", [
      "purchase",
      "reward",
      "crate_open",
      "other",
    ]).notNull(),
    cardId: bigint("card_id", { mode: "number", unsigned: true }).references(
      () => cardsTable.id
    ),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => {
    return [index("user_id_index").on(t.userId)];
  }
);

export type CreditsTransaction = typeof creditsTransactionTable.$inferInsert;
