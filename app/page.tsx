import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Header from "./_components/header";

const Home = async () => {
   const { userId } = await auth();

   if (!userId) {
      redirect("/login");
   }

   return (
      <>
         <Header />

         <div className="flex w-screen items-center justify-center">
            <UserButton showName />
         </div>
      </>
   );
};

export default Home;
