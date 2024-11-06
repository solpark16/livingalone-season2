import Page from "@/components/common/Page/Page";
import PageTitle from "@/components/common/Page/PageTitle";
import TopButton from "@/components/common/button/TopButton";
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
