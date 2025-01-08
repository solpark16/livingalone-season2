import IsLoading from "@/components/common/loading/IsLoading";
import dynamic from "next/dynamic";
import { Suspense } from "react";

function HomePage() {
  const TopButton = dynamic(
    () => import("@/components/common/button/TopButton")
  );
  const Banner = dynamic(() => import("@/components/main/common/Banner"));
  const GroupSection = dynamic(
    () => import("@/components/main/group/GroupSection")
  );
  const LivingTvSection = dynamic(
    () => import("@/components/main/livingtv/LivingTvSection")
  );
  const MustSection = dynamic(
    () => import("@/components/main/must/MustSection")
  );

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
