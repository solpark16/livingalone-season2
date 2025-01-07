import TopButton from "@/components/common/button/TopButton";
import Page from "@/components/common/page/Page";
import PageTitle from "@/components/common/page/PageTitle";
import VideoList from "@/components/livingtv/VideoList";

function LivingTvPage() {
  return (
    <Page>
      <PageTitle title="자취 티비" />
      <VideoList />
      <TopButton />
    </Page>
  );
}

export default LivingTvPage;
