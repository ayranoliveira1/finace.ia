"use client";

import { Transaction } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import TransactionTypeBadge from "../_components/type-badge";
import { formatCurrency } from "@/app/_helpers/currency";
import { Button } from "@/app/_components/ui/button";
import { PencilIcon, TrashIcon } from "lucide-react";

export const TRANSACTION_CATEGORY_LABELS = {
   EDUCATION: "Educação",
   ENTERTAINMENT: "Entretenimento",
   FOOD: "Alimentação",
   HEALTH: "Saúde",
   HOUSING: "Moradia",
   OTHER: "Outros",
   SALARY: "Salário",
   TRANSPORTATION: "Transporte",
   UTILITY: "Utilidades",
};

export const TRANSACTION_PAYMENT_METHOD_LABELS = {
   BANK_TRANSFER: "Transferência bancária",
   BANK_SLIP: "Boleto bancário",
   CASH: "Dinheiro",
   CREEDIT_CARD: "Cartão de crédito",
   DEBIT_CARD: "Cartão de débito",
   PIX: "PIX",
   OTHER: "Outros",
};

export const transactionColumns: ColumnDef<Transaction>[] = [
   {
      accessorKey: "name",
      header: "Nome",
   },
   {
      accessorKey: "type",
      header: "Tipo",
      cell: ({ row: { original: transaction } }) => (
         <TransactionTypeBadge transaction={transaction} />
      ),
   },
   {
      accessorKey: "category",
      header: "Categoria",
      cell: ({ row: { original: transaction } }) =>
         TRANSACTION_CATEGORY_LABELS[transaction.category],
   },
   {
      accessorKey: "paymentMethod",
      header: "Metodo de pagamento",
      cell: ({ row: { original: transaction } }) =>
         TRANSACTION_PAYMENT_METHOD_LABELS[transaction.paymentMethod],
   },
   {
      accessorKey: "date",
      header: "Data",
      cell: ({ row: { original: transaction } }) =>
         new Date(transaction.date).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "long",
            year: "numeric",
         }),
   },
   {
      accessorKey: "amount",
      header: "Valor",
      cell: ({ row: { original: transaction } }) =>
         formatCurrency(Number(transaction.amount)),
   },
   {
      accessorKey: "actions",
      header: "",
      cell: () => {
         return (
            <div className="space-x-1">
               <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground"
               >
                  <PencilIcon />
               </Button>

               <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground"
               >
                  <TrashIcon />
               </Button>
            </div>
         );
      },
   },
];
