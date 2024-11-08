import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Header from "../_components/header";
import SummaryCards from "./_components/summary-cards";
import TimeSelect from "./_components/time-select";
import { isMatch } from "date-fns";

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

   return (
      <>
         <Header />

         <div className="space-y-6 p-6">
            <div className="flex items-center justify-between">
               <h1 className="text-2xl font-bold">Dashboard</h1>

               <TimeSelect />
            </div>

            <SummaryCards month={month} />
         </div>
      </>
   );
};

export default Home;
