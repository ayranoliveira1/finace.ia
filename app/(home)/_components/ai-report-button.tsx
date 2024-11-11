"use client";

import { Button } from "@/app/_components/ui/button";
import {
   Dialog,
   DialogClose,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/app/_components/ui/dialog";
import { BotIcon, LoaderCircleIcon } from "lucide-react";
import { generateAiReport } from "../_actions/generate-ai-report";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import Markdown from "react-markdown";
import { useState } from "react";

interface AiReportButtonProps {
   month: string;
}

const AiReportButton = ({ month }: AiReportButtonProps) => {
   const [report, setReport] = useState<string | null>(null);
   const [reportIsLoading, setReportIsLoading] = useState<boolean>(false);

   const handleGenerateReportClick = async () => {
      try {
         setReportIsLoading(true);
         const aiReport = await generateAiReport({ month });
         setReport(aiReport);
      } catch (error) {
         console.log(error);
      } finally {
         setReportIsLoading(false);
      }
   };

   return (
      <Dialog>
         <DialogTrigger asChild>
            <Button className="font-bold" variant="ghost">
               Relatório IA
               <BotIcon />
            </Button>
         </DialogTrigger>

         <DialogContent className="max-w-[600px] overflow-hidden">
            <DialogHeader>
               <DialogTitle>Relatório IA</DialogTitle>
               <DialogDescription>
                  Use inteligência artificial para gerar um relatório com
                  insights sobre suas finanças.
               </DialogDescription>
            </DialogHeader>

            <ScrollArea className="prose max-h-[450px] text-white prose-h3:text-white prose-h4:text-white prose-strong:text-white">
               <Markdown>{report}</Markdown>
            </ScrollArea>

            <DialogFooter>
               <DialogClose asChild>
                  <Button variant="ghost">Cancelar</Button>
               </DialogClose>

               <Button
                  onClick={handleGenerateReportClick}
                  disabled={reportIsLoading}
               >
                  {reportIsLoading && (
                     <LoaderCircleIcon className="animate-spin" />
                  )}
                  {reportIsLoading ? `Gerando Relatório` : "Gerar relatório"}
               </Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   );
};

export default AiReportButton;