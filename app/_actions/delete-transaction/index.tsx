"use server";

import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { deleteTransactionSchema, DeleteTransactionType } from "./schema";
import { revalidatePath } from "next/cache";

export const deleteTransaction = async ({ id }: DeleteTransactionType) => {
   deleteTransactionSchema.parse({ id });

   const { userId } = await auth();
   if (!userId) {
      throw new Error("Unauthorized");
   }

   await db.transaction.delete({
      where: {
         id,
         userId,
      },
   });

   revalidatePath("/");
   revalidatePath("/transactions");
   revalidatePath("/subscription");
};
