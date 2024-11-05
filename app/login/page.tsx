import Image from "next/image";
import { Button } from "../_components/ui/button";
import { LogInIcon } from "lucide-react";

const LoginPage = () => {
   return (
      <div className="grid h-full grid-cols-2 p-8">
         <div className="mx-auto flex w-full max-w-[550px] flex-col justify-center">
            <Image
               src="logo.svg"
               width={173}
               height={39}
               alt="Finance Ai"
               className="mb-8"
            />

            <h1 className="mb-3 text-4xl font-bold">Bem-vindo</h1>

            <p className="text-muted-foreground mb-8">
               A Finance AI é uma plataforma de gestão financeira que utiliza IA
               para monitorar suas movimentações, e oferecer insights
               personalizados, facilitando o controle do seu orçamento.
            </p>

            <Button variant="outline">
               <LogInIcon className="mr-2" />
               Fazer login
            </Button>
         </div>

         <div className="relative h-full w-full">
            <Image
               src="/login.png"
               alt="dashboard"
               fill
               className="object-cover"
            />
         </div>
      </div>
   );
};

export default LoginPage;
