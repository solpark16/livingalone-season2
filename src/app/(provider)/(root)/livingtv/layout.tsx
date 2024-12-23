import MobileHeader from "@/components/common/header/MobileHeader";
import MobileNav from "@/components/common/header/MobileNav";
import IsOpenProvider from "@/providers/IsOpenProvider";
import { PropsWithChildren } from "react";

function LivingTvLayout({ children }: PropsWithChildren) {
  return (
    <>
      <MobileHeader title="자취 티비" />
      <IsOpenProvider>
        <main>{children}</main>
      </IsOpenProvider>
      <MobileNav />
    </>
  );
}

export default LivingTvLayout;
