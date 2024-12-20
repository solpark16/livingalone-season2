import TopButton from "@/components/common/button/TopButton";
import Page from "@/components/common/page/Page";
import PageTitle from "@/components/common/page/PageTitle";
import MustCategory from "@/components/mustpost/list/MustCategory";
import MustPostList from "@/components/mustpost/list/MustPostList";

function MustListPage() {
  return (
    <Page>
      <PageTitle title="자랑해 자취템" />
      <MustCategory />
      <MustPostList />
      <TopButton />
    </Page>
  );
}

export default MustListPage;
