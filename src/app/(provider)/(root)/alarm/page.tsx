import AlarmList from "@/components/alarm/AlarmList";
import IsReadFilter from "@/components/alarm/IsReadFilter";
import InnerLayout from "@/components/common/Page/InnerLayout";
import Page from "@/components/common/Page/Page";
import PageTitle from "@/components/common/Page/PageTitle";

function AlarmPage() {
  return (
    <Page>
      <InnerLayout>
        <div className="w-full flex flex-col justify-start">
          <PageTitle title="알림" />
          <IsReadFilter />
          <AlarmList />
        </div>
      </InnerLayout>
    </Page>
  );
}

export default AlarmPage;
