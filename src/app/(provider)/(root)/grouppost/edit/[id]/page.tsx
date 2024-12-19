import Page from "@/components/common/page/Page";
import GroupEditForm from "@/components/grouppost/edit/GroupEditForm";

function GroupEditPage({ params }: { params: { id: string } }) {
  return (
    <Page>
      <GroupEditForm params={params} />
    </Page>
  );
}

export default GroupEditPage;
