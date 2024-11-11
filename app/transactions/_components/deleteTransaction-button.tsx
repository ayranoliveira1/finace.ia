import { deleteTransaction } from "@/app/_actions/delete-transaction";
import {
   AlertDialog,
   AlertDialogAction,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle,
   AlertDialogTrigger,
} from "@/app/_components/ui/alert-dialog";
import { Button } from "@/app/_components/ui/button";
import { TrashIcon } from "lucide-react";

interface DeleteTransactionButtonProps {
   transactionId: string;
}

const DeleteTransactionButton = ({
   transactionId,
}: DeleteTransactionButtonProps) => {
   const handleDeleteTransaction = async () => {
      try {
         await deleteTransaction({ id: transactionId });
      } catch (error) {
         console.error(error);
      }
   };

   return (
      <AlertDialog>
         <AlertDialogTrigger asChild>
            <Button
               variant="ghost"
               size="icon"
               className="text-muted-foreground"
            >
               <TrashIcon />
            </Button>
         </AlertDialogTrigger>

         <AlertDialogContent>
            <AlertDialogHeader>
               <AlertDialogTitle>
                  Deseja deletar essa transação?
               </AlertDialogTitle>

               <AlertDialogDescription>
                  Uma vez deletada não poderá recuperá-la.
               </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
               <AlertDialogCancel>Cancela</AlertDialogCancel>

               <AlertDialogAction
                  onClick={handleDeleteTransaction}
                  className="bg-red-500 hover:bg-red-600"
               >
                  Deletar
               </AlertDialogAction>
            </AlertDialogFooter>
         </AlertDialogContent>
      </AlertDialog>
   );
};

export default DeleteTransactionButton;
