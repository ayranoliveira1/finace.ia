import { auth } from "@clerk/nextjs/server";
import Header from "../_components/header";
import { redirect } from "next/navigation";

const SubscriptionPage = async () => {
   const { userId } = await auth();
   if (!userId) {
      redirect("/login");
   }

   return <Header />;
};

export default SubscriptionPage;
