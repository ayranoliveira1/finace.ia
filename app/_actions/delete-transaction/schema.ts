import { z } from "zod";

export const deleteTransactionSchema = z.object({
   id: z.string().uuid(),
});

export type DeleteTransactionType = z.infer<typeof deleteTransactionSchema>;
