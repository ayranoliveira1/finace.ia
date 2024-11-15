import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";

interface GetLastTransactionsProps {
   month: string;
   year: string;
}

export const getLastTransactions = async ({
   month,
   year,
}: GetLastTransactionsProps) => {
   const { userId } = await auth();
   if (!userId) {
      throw new Error("Unauthorized");
   }

   const where = {
      userId,
      date: {
         gte: new Date(`${year}-${month}-01`),
         lt: new Date(`${year}-${month}-31`),
      },
   };

   return await db.transaction.findMany({
      where,
      orderBy: { date: "desc" },
      take: 5,
   });
};
