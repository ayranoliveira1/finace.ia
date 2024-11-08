import AddTransactionButton from "@/app/_components/add-transaction-button";
import { Card, CardContent, CardHeader } from "@/app/_components/ui/card";
import { formatCurrency } from "@/app/_helpers/currency";
import { ReactNode } from "react";

interface SummaryCardProps {
   icon: ReactNode;
   title: string;
   amount: number;
   size?: "small" | "large";
}

const SummaryCard = ({
   icon,
   title,
   amount,
   size = "small",
}: SummaryCardProps) => {
   return (
      <Card>
         <CardHeader className="flex-row items-center gap-2">
            {icon}
            <p
               className={`${size === "small" ? "text-muted-foreground" : "text-white opacity-70"}`}
            >
               {title}
            </p>
         </CardHeader>

         <CardContent className="flex justify-between">
            <p
               className={`font-bold ${size === "small" ? "text-2xl" : "text-4xl"}`}
            >
               {formatCurrency(amount)}
            </p>

            {size === "large" && <AddTransactionButton />}
         </CardContent>
      </Card>
   );
};

export default SummaryCard;