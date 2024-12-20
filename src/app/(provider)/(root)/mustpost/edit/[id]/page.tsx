import TopButton from "@/components/common/button/TopButton";
import Page from "@/components/common/page/Page";
import MustEditForm from "@/components/mustpost/edit/MustEditForm";

function MustEditPage({ params }: { params: { id: string } }) {
  return (
    <Page>
      <MustEditForm params={params} />
      <TopButton />
    </Page>
  );
}

export default MustEditPage;
