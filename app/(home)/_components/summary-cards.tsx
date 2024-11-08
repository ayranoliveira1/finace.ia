import {
   PiggyBankIcon,
   TrendingDownIcon,
   TrendingUpIcon,
   WalletIcon,
} from "lucide-react";
import SummaryCard from "./summary-card";
import { db } from "@/app/_lib/prisma";

interface SummaryCardsProps {
   month: string;
}

const SummaryCards = async ({ month }: SummaryCardsProps) => {
   const where = {
      date: {
         gte: new Date(`2024-${month}-01`),
         lt: new Date(`2024-${month}-31`),
      },
   };

   const depositTotal = (
      await db.transaction.aggregate({
         where: { ...where, type: "DEPOSIT" },
         _sum: { amount: true },
      })
   )._sum.amount;

   const investmentTotal = (
      await db.transaction.aggregate({
         where: { ...where, type: "INVESTMENT" },
         _sum: { amount: true },
      })
   )._sum.amount;

   const expensesTotal = (
      await db.transaction.aggregate({
         where: { ...where, type: "EXPENSE" },
         _sum: { amount: true },
      })
   )._sum.amount;

   const balance =
      Number(depositTotal) - Number(investmentTotal) - Number(expensesTotal);

   return (
      <div className="space-y-6">
         <SummaryCard
            icon={<WalletIcon size={18} />}
            title="Saldo"
            amount={balance}
            size="large"
         />

         <div className="grid grid-cols-3 gap-6">
            <SummaryCard
               icon={<PiggyBankIcon size={16} />}
               title="Investido"
               amount={Number(investmentTotal)}
            />

            <SummaryCard
               icon={<TrendingUpIcon size={16} className="text-primary" />}
               title="Receita"
               amount={Number(depositTotal)}
            />

            <SummaryCard
               icon={<TrendingDownIcon size={16} className="text-red-500" />}
               title="Despesas"
               amount={Number(expensesTotal)}
            />
         </div>
      </div>
   );
};

export default SummaryCards;
