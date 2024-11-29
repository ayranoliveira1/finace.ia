import { MenuIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

const MenuHeader = () => {
   return (
      <nav className="flex lg:hidden">
         <Sheet>
            <SheetTrigger asChild>
               <Button variant="ghost">
                  <MenuIcon size={10} />
               </Button>
            </SheetTrigger>

            <SheetContent>teste</SheetContent>
         </Sheet>
      </nav>
   );
};

export default MenuHeader;
