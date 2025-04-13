import "server-only";
import { db } from ".";
import { usersTable } from "./schema";
import { eq } from "drizzle-orm";

export const QUERIES = {
  getUserByClerkId: function (clerkId: string) {
    return db.select().from(usersTable).where(eq(usersTable.clerkId, clerkId));
  },
};

export const MUTATIONS = {
  createNewUser: async function (clerkId: string) {
    return await db
      .insert(usersTable)
      .values({
        clerkId: clerkId,
        credits: 3,
      })
      .$returningId();
  },
};
