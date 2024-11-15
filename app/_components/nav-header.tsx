"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavHeader = () => {
   const pathname = usePathname();

   return (
      <>
         <Link
            href="/"
            className={`font-bold hover:text-primary ${
               pathname === "/"
                  ? "font-bold text-primary"
                  : "text-muted-foreground"
            }`}
         >
            Dashboard
         </Link>
         <Link
            href="/transactions"
            className={`font-bold hover:text-primary ${
               pathname === "/transactions"
                  ? "font-bold text-primary"
                  : "text-muted-foreground"
            }`}
         >
            Transações
         </Link>
         <Link
            href="/subscription"
            className={`font-bold hover:text-primary ${
               pathname === "/subscription"
                  ? "font-bold text-primary"
                  : "text-muted-foreground"
            }`}
         >
            Assinaturas
         </Link>
      </>
   );
};

export default NavHeader;
