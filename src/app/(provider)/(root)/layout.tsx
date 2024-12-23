import Footer from "@/components/common/footer/Footer";
import Header from "@/components/common/header/Header";
import MobileHeader from "@/components/common/header/MobileHeader";
import MobileNav from "@/components/common/header/MobileNav";
import GetUserProvider from "@/providers/GetUserProvider";
import IsOpenProvider from "@/providers/IsOpenProvider";
import { PropsWithChildren } from "react";

async function MainLayout({ children }: PropsWithChildren) {
  return (
    <div className="font-pretendard">
      <GetUserProvider>
        <div className="hidden md:block">
          <Header />
        </div>
        <div className="relative">
          <div>
            <MobileHeader />
            <IsOpenProvider>{children}</IsOpenProvider>
            <MobileNav />
          </div>
          <Footer />
        </div>
      </GetUserProvider>
    </div>
  );
}

export default MainLayout;
