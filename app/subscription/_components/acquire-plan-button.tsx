"use client";

import { loadStripe } from "@stripe/stripe-js";

import { Button } from "@/app/_components/ui/button";
import { createStripeCheckout } from "../_actions/create-stripe-checkout";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

const AcquirePlanButton = () => {
   const { user } = useUser();

   const handleAcquirePlanClick = async () => {
      const { sessionId } = await createStripeCheckout();

      if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
         throw new Error("Stripe publishable key not found");
      }
      const stripe = await loadStripe(
         process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
      );

      if (!stripe) {
         throw new Error("Stripe not found");
      }

      await stripe.redirectToCheckout({ sessionId });
   };

   const hashPriemiumPlan = user?.publicMetadata.subscriptionPlan === "premium";

   if (hashPriemiumPlan) {
      return (
         <Button
            asChild
            className="w-full rounded-full border border-green-500 font-bold"
            variant="link"
         >
            <Link
               href={`${process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_URL as string}?prefilled_email=${user.emailAddresses[0]}`}
            >
               Gerenciar Plano
            </Link>
         </Button>
      );
   }

   return (
      <Button
         className="w-full rounded-full bg-primary font-bold"
         onClick={handleAcquirePlanClick}
      >
         Adquirir Plano
      </Button>
   );
};

export default AcquirePlanButton;
