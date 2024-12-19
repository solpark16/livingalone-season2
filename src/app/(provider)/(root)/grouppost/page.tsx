import TopButton from "@/components/common/button/TopButton";
import Page from "@/components/common/page/Page";
import PageTitle from "@/components/common/page/PageTitle";
import GroupPostList from "@/components/grouppost/list/GroupPostList";
import ProgressStatus from "@/components/grouppost/list/ProgressStatus";

function GroupListPage() {
  return (
    <Page>
      <PageTitle title="자랑해 자취템" />
      <ProgressStatus />
      <GroupPostList />
      <TopButton />
    </Page>
  );
}

export default GroupListPage;
