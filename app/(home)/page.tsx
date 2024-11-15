import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Header from "../_components/header";
import SummaryCards from "./_components/summary-cards";
import TimeSelect from "./_components/time-select";
import { isMatch } from "date-fns";
import TransactionsPieChart from "./_components/transactions-pie-chart";
import { getDashboard } from "../_data/get-dashboard";
import ExpensePerCategory from "./_components/expenses-per-category";
import LastTransactions from "./_components/last-transactions";
import { canUserAddTransaction } from "../_data/can-user-add-transactions";
import AiReportButton from "./_components/ai-report-button";
import { Suspense } from "react";
import LastTransactionSkeleton from "./_components/skeleton/last-tranasaction-skeleton";

interface HomePros {
   searchParams: {
      year: string;
      month: string;
   };
}

const Home = async ({ searchParams: { year, month } }: HomePros) => {
   const { userId } = await auth();

   if (!userId) {
      redirect("/login");
   }

   const yearIsValid = !year || !isMatch(year, "yyyy");
   const monthIsValid = !month || !isMatch(month, "MM");

   if (yearIsValid && monthIsValid) {
      redirect(
         `/?year=${new Date().getFullYear()}&month=${new Date().getMonth() + 1}`,
      );
   }

   const dashboard = await getDashboard({ month, year });

   const userCanAddTransaction = await canUserAddTransaction();

   const user = (await clerkClient()).users.getUser(userId);

   return (
      <>
         <Header />

         <div className="flex flex-col space-y-6 overflow-hidden p-6">
            <div className="flex items-center justify-between">
               <h1 className="text-2xl font-bold">Dashboard</h1>

               <div className="flex items-center gap-5">
                  <AiReportButton
                     hasPremiumPlan={
                        (await user).publicMetadata.subscriptionPlan ===
                        "premium"
                     }
                     year={year}
                     month={month}
                  />
                  <TimeSelect />
               </div>
            </div>

            <div className="grid grid-cols-[2fr,1fr] gap-6 overflow-hidden">
               <div className="flex flex-col gap-6 overflow-hidden">
                  <SummaryCards
                     userCanAddTransaction={userCanAddTransaction}
                     {...dashboard}
                  />

                  <div className="grid grid-cols-3 grid-rows-1 gap-6 overflow-hidden">
                     <TransactionsPieChart {...dashboard} />

                     <ExpensePerCategory
                        expensesPerCategory={dashboard.totalExpensePerCategory}
                     />
                  </div>
               </div>

               <Suspense fallback={<LastTransactionSkeleton />}>
                  <LastTransactions month={month} year={year} />
               </Suspense>
            </div>
         </div>
      </>
   );
};

export default Home;
