import { db } from "@/app/_lib/prisma";

export const getLastTransactions = async (userId: string, month: string) => {
   const where = {
      date: {
         gte: new Date(`2024-${month}-01`),
         lt: new Date(`2024-${month}-31`),
      },
   };

   return await db.transaction.findMany({
      where: { userId, ...where },
      orderBy: { date: "desc" },
      take: 5,
   });
};
