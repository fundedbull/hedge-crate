import "server-only";
import { db } from ".";
import { cardsTable, creditsTransactionTable, usersTable } from "./schema";
import { and, eq, sql } from "drizzle-orm";

export const QUERIES = {
  getUserByClerkId: function (clerkId: string) {
    return db.select().from(usersTable).where(eq(usersTable.clerkId, clerkId));
  },
  getCratesByUserId: function (userId: number) {
    return db.select().from(cardsTable).where(eq(cardsTable.userId, userId));
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
  openCrate: async function (
    clerkId: string,
    crateType: "common" | "rare" | "epic"
  ) {
    const [user] = await QUERIES.getUserByClerkId(clerkId);

    if (!user) {
      return [false, MutationsErrors.ERROR_USER_NOT_FOUND];
    }

    // TODO: Generate card later

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

    const [userResult, creditsResult] = await Promise.all([
      db
        .update(usersTable)
        .set({ credits: user.credits - credit })
        .where(eq(usersTable.clerkId, clerkId)),

      db.insert(creditsTransactionTable).values({
        userId: user.id,
        amount: credit,
        type: "crate_open",
      }),
    ]);

    console.log(userResult, creditsResult);

    return [true, null];
  },
};
