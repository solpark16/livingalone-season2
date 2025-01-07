import TopButton from "@/components/common/button/TopButton";
import IsLoading from "@/components/common/loading/IsLoading";
import Banner from "@/components/main/common/Banner";
import GroupSection from "@/components/main/group/GroupSection";
import LivingTvSection from "@/components/main/livingtv/LivingTvSection";
import MustSection from "@/components/main/must/MustSection";
import { Suspense } from "react";

function HomePage() {
  return (
    <Suspense fallback={<IsLoading />}>
      <main className="bg-main-1 pb-[240px]">
        <Banner />
        <MustSection />
        <LivingTvSection />
        <GroupSection />
        <TopButton />
      </main>
    </Suspense>
  );
}

export default HomePage;
