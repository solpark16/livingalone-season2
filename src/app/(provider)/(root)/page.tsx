import TopButton from "@/components/common/button/TopButton";
import MobileHeader from "@/components/common/header/MobileHeader";
import MobileNav from "@/components/common/header/MobileNav";
import Banner from "@/components/main/common/Banner";
import GroupSection from "@/components/main/group/GroupSection";
import LivingTvSection from "@/components/main/livingtv/LivingTvSection";
import MustSection from "@/components/main/must/MustSection";
import IsOpenProvider from "@/providers/IsOpenProvider";

function HomePage() {
  return (
    <>
      {/* <FrontBanner /> */}
      <MobileHeader />
      <IsOpenProvider>
        <main className="bg-main-1 pb-[240px]">
          <Banner />
          <MustSection />
          <LivingTvSection />
          <GroupSection />
          <TopButton />
        </main>
      </IsOpenProvider>
      <MobileNav />
    </>
  );
}

export default HomePage;
