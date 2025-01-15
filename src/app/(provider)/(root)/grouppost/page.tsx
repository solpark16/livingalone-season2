import TopButton from "@/components/common/button/TopButton";
import Page from "@/components/common/page/Page";
import PageTitle from "@/components/common/page/PageTitle";
import GroupPostList from "@/components/grouppost/list/GroupPostList";
import ProgressStatus from "@/components/grouppost/list/ProgressStatus";

function GroupListPage() {
  return (
    <Page>
      <PageTitle title="같이 사 공구템" />
      <ProgressStatus />
      <GroupPostList />
      <TopButton />
    </Page>
  );
}

export default GroupListPage;
