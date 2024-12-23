import MobileHeader from "@/components/common/header/MobileHeader";
import MobileNav from "@/components/common/header/MobileNav";
import IsOpenProvider from "@/providers/IsOpenProvider";
import { PropsWithChildren } from "react";

function PaymentLayout({ children }: PropsWithChildren) {
  return (
    <>
      <MobileHeader />
      <IsOpenProvider>
        <main className="bg-lime-1">{children}</main>
      </IsOpenProvider>
      <MobileNav />
    </>
  );
}

export default PaymentLayout;
