import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Header from "../_components/header";
import SummaryCards from "./_components/summary-cards";
import TimeSelect from "./_components/time-select";
import { isMatch } from "date-fns";
import TransactionsPieChart from "./_components/transactions-pie-chart";
import { getDashboard } from "../_data-acess/get-dashboard";
import ExpensePerCategory from "./_components/expenses-per-category";
import { getLastTransactions } from "../_data-acess/get-dashboard/get-last-transactions";
import LastTransactions from "./_components/last-transactions";

interface HomePros {
   searchParams: {
      month: string;
   };
}

const Home = async ({ searchParams: { month } }: HomePros) => {
   const { userId } = await auth();

   if (!userId) {
      redirect("/login");
   }

   const monthIsValid = !month || !isMatch(month, "MM");

   if (monthIsValid) {
      redirect(`/?month=${new Date().getMonth() + 1}`);
   }

   const dashboard = await getDashboard(month);

   const lastTransactions = await getLastTransactions(userId, month);

   return (
      <>
         <Header />

         <div className="space-y-6 p-6">
            <div className="flex items-center justify-between">
               <h1 className="text-2xl font-bold">Dashboard</h1>

               <TimeSelect />
            </div>

            <div className="grid grid-cols-[2fr,1fr] gap-6">
               <div className="flex flex-col gap-6">
                  <SummaryCards {...dashboard} />

                  <div className="grid grid-cols-3 grid-rows-1 gap-6">
                     <TransactionsPieChart {...dashboard} />

                     <ExpensePerCategory
                        expensesPerCategory={dashboard.totalExpensePerCategory}
                     />
                  </div>
               </div>

               <LastTransactions lasTransactions={lastTransactions} />
            </div>
         </div>
      </>
   );
};

export default Home;
