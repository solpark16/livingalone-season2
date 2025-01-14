import { getGroupDetail } from "@/apis/grouppost";
import TopButton from "@/components/common/button/TopButton";
import Page from "@/components/common/page/Page";
import GroupDetail from "@/components/grouppost/read/GroupDetail";
import type { Metadata } from "next";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const data = await getGroupDetail(id);
  return {
    title: `${data?.title}`,
  };
}

function GroupReadPage({ params }: Props) {
  return (
    <Page>
      <GroupDetail params={params} />
      <TopButton />
    </Page>
  );
}

export default GroupReadPage;
