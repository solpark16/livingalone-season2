import TopButton from "@/components/common/button/TopButton";
import Page from "@/components/common/page/Page";
import VideoList from "@/components/livingtv/VideoList";
import React from "react";

function LivingTvPage() {
  return (
    <Page>
      <VideoList />
      <TopButton />
    </Page>
  );
}

export default LivingTvPage;
