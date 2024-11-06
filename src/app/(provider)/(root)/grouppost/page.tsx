import Page from "@/components/common/Page/Page";
import PageTitle from "@/components/common/Page/PageTitle";
import TopButton from "@/components/common/button/TopButton";
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
