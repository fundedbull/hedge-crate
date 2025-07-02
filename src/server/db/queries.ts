import "server-only";
import { db } from ".";
import { cardsTable, creditsTransactionTable, usersTable } from "./schema";
import { and, desc, eq, sql } from "drizzle-orm";

export const QUERIES = {
  getUserByClerkId: function (clerkId: string) {
    return db.select().from(usersTable).where(eq(usersTable.clerkId, clerkId));
  },
  getCratesByUserId: function (userId: number) {
    return db.select().from(cardsTable).where(eq(cardsTable.userId, userId));
  },
  getCratesByUserIdWithPagination: function (
    userId: number,
    page: number,
    pageSize: number
  ) {
    return db
      .select()
      .from(cardsTable)
      .where(eq(cardsTable.userId, userId))
      .orderBy(desc(cardsTable.createdAt))
      .limit(pageSize)
      .offset((page - 1) * pageSize);
  },
  getTotalCratesByUserId: async function (userId: number) {
    const result = await db
      .select({ count: sql<number>`count(*)` })
      .from(cardsTable)
      .where(eq(cardsTable.userId, userId));
    return result[0].count;
  },
  getRecentCratesByUserId: function (userId: number) {
    return db
      .select()
      .from(cardsTable)
      .where(eq(cardsTable.userId, userId))
      .orderBy(desc(cardsTable.createdAt))
      .limit(5);
  },
  getCratesByUserIdForMonth: function (
    userId: number,
    year: number,
    month: number
  ) {
    return db
      .select()
      .from(cardsTable)
      .where(
        and(
          eq(cardsTable.userId, userId),
          sql`YEAR(created_at) = ${year} AND MONTH(created_at) = ${month}`
        )
      );
  },
  getTodayCrateOpensCount: async function (userId: number) {
    const result = await db
      .select({ count: sql<number>`COUNT(*)` })
      .from(creditsTransactionTable)
      .where(
        and(
          eq(creditsTransactionTable.userId, userId),
          eq(creditsTransactionTable.type, "crate_open"),
          sql`DATE(${creditsTransactionTable.createdAt}) = CURRENT_DATE`
        )
      );

    return result[0]?.count ?? 0;
  },
  getCard: async function (cardId: number) {
    return await db.select().from(cardsTable).where(eq(cardsTable.id, cardId));
  },
};

enum MutationsErrors {
  ERROR_USER_NOT_FOUND,
}

export const MUTATIONS = {
  createNewUser: async function (clerkId: string) {
    return await db
      .insert(usersTable)
      .values({
        clerkId: clerkId,
        credits: 9,
      })
      .$returningId();
  },
  /*
  openCrate: async function (
    clerkId: string,
    crateType: "common" | "rare" | "epic"
  ) {
    const [user] = await QUERIES.getUserByClerkId(clerkId);

    if (!user) {
      return [false, MutationsErrors.ERROR_USER_NOT_FOUND];
    }

    const response = await CreateCommonCreateHistoricalContext();
    const data = JSON.parse(response);
    let credit = 0;
    switch (crateType) {
      case "common":
        credit = 1;
        break;
      case "rare":
        credit = 2;
        break;
      case "epic":
        credit = 3;
    }

    const [userResult, creditsResult, cardResult] = await Promise.all([
      db
        .update(usersTable)
        .set({ credits: user.credits - credit })
        .where(eq(usersTable.clerkId, clerkId)),

      db.insert(creditsTransactionTable).values({
        userId: user.id,
        amount: credit,
        type: "crate_open",
      }),
      db.insert(cardsTable).values({
        userId: user.id,
        setup: data["setup"],
        exitPlan: data["exitPlan"],
        difficulty: "easy",
        instrument: "TSLA",
        rarity: crateType,
        strategy: data["strategy"],
      }),
    ]);

    console.log(userResult, creditsResult, cardResult);
    return [true, null];
  },
  */
};
