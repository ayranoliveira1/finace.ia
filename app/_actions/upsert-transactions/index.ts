"use server";

import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { upsertTransactionSchema } from "./schema";
import {
   TransactionCategory,
   TransactionPaymentMethod,
   TransactionType,
} from "@prisma/client";
import { revalidatePath } from "next/cache";

interface UpsertTransactionsArgs {
   name: string;
   amount: number;
   type: TransactionType;
   category: TransactionCategory;
   paymentMethod: TransactionPaymentMethod;
   date: Date;
}

export const upsertTransactions = async (data: UpsertTransactionsArgs) => {
   upsertTransactionSchema.parse(data);

   const { userId } = await auth();
   if (!userId) {
      throw new Error("Unauthorized");
   }

   await db.transaction.create({
      data: {
         ...data,
         userId,
      },
   });

   revalidatePath("/transactions");
};
