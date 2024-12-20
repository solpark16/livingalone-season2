import MyPageMenu from "@/components/auth/mypage/MyPageMenu";
import MyApplyGroup from "@/components/auth/mypage/myApplyGroup/MyApplyGroup";
import PageTitle from "@/components/common/page/PageTitle";

function MyApplyGroupPage() {
  return (
    <>
      <PageTitle title="신청한 공구" />
      <MyPageMenu />
      <MyApplyGroup />
    </>
  );
}

export default MyApplyGroupPage;
