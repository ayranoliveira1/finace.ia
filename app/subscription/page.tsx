import { auth, clerkClient } from "@clerk/nextjs/server";
import Header from "../_components/header";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader } from "../_components/ui/card";
import { CheckIcon, XIcon } from "lucide-react";
import AcquirePlanButton from "./_components/acquire-plan-button";
import { Badge } from "../_components/ui/badge";
import { getCurrentMonthTransactions } from "../_data/get-current-month-transactions";

const SubscriptionPage = async () => {
   const { userId } = await auth();
   if (!userId) {
      redirect("/login");
   }

   const user = (await clerkClient()).users.getUser(userId);

   const hashPriemiumPlan =
      (await user).publicMetadata.subscriptionPlan === "premium";

   const currentMonthTransactions = await getCurrentMonthTransactions();

   return (
      <>
         <Header />
         <div className="space-y-6 p-6">
            <h1 className="text-2xl font-bold">Assinaturas</h1>

            <div className="flex flex-col gap-6 lg:flex-row">
               <Card className="max-w-[450px] lg:min-w-[450px]">
                  <CardHeader className="relative border-b border-solid py-8">
                     {!hashPriemiumPlan && (
                        <Badge className="absolute left-4 top-12 bg-primary/10 text-primary">
                           Ativo
                        </Badge>
                     )}

                     <h2 className="text-center text-2xl font-semibold">
                        Plano Básico
                     </h2>

                     <div className="flex items-center justify-center gap-3">
                        <span className="text-4xl">R$</span>
                        <span className="text-6xl">0</span>
                        <span className="text-xl text-muted-foreground">
                           mês
                        </span>
                     </div>
                  </CardHeader>

                  <CardContent className="space-y-6 py-8">
                     <div className="flex items-center gap-2">
                        <CheckIcon className="text-primary" />
                        <p>
                           Apenas 10 transações por mês (
                           {currentMonthTransactions}/10)
                        </p>
                     </div>

                     <div className="flex items-center gap-2">
                        <XIcon />
                        <p>Relatórios de IA</p>
                     </div>
                  </CardContent>
               </Card>

               <Card className="max-w-[450px] lg:min-w-[450px]">
                  <CardHeader className="relative border-b border-solid py-8">
                     {hashPriemiumPlan && (
                        <Badge className="absolute left-4 top-12 bg-primary/10 text-primary">
                           Ativo
                        </Badge>
                     )}
                     <h2 className="text-center text-2xl font-semibold">
                        Plano Premium
                     </h2>

                     <div className="flex items-center justify-center gap-3">
                        <span className="text-4xl">R$</span>
                        <span className="text-6xl">19</span>
                        <span className="text-xl text-muted-foreground">
                           mês
                        </span>
                     </div>
                  </CardHeader>

                  <CardContent className="space-y-6 py-8">
                     <div className="flex items-center gap-2">
                        <CheckIcon className="text-primary" />
                        <p>Transações ilimitadas</p>
                     </div>

                     <div className="flex items-center gap-2">
                        <CheckIcon className="text-primary" />
                        <p>Relatórios de IA </p>
                     </div>

                     <AcquirePlanButton />
                  </CardContent>
               </Card>
            </div>
         </div>
      </>
   );
};

export default SubscriptionPage;
