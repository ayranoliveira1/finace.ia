import { db } from "../_lib/prisma";
import { DataTable } from "../_components/ui/data-table";
import { transactionColumns } from "./_columns";
import AddTransactionButton from "../_components/add-transaction-button";
import Header from "../_components/header";

const TransactionsPage = async () => {
   const transactions = await db.transaction.findMany({});

   return (
      <>
         <Header />

         <div className="space-y-4 p-6">
            <div className="flex w-full items-center justify-between">
               <h1 className="text-2xl font-bold">Transações</h1>

               <AddTransactionButton />
            </div>

            <DataTable
               columns={transactionColumns}
               data={JSON.parse(JSON.stringify(transactions))}
            />
         </div>
      </>
   );
};

export default TransactionsPage;
