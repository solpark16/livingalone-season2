import TopButton from "@/components/common/button/TopButton";
import Banner from "@/components/main/common/Banner";
import GroupSection from "@/components/main/group/GroupSection";
import LivingTvSection from "@/components/main/livingtv/LivingTvSection";
import MustSection from "@/components/main/must/MustSection";

function HomePage() {
  return (
    <>
      <main className="bg-main-1 pb-[240px]">
        <Banner />
        <MustSection />
        <LivingTvSection />
        <GroupSection />
        <TopButton />
      </main>
    </>
  );
}

export default HomePage;
