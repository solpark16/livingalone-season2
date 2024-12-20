import MyMust from "@/components/auth/mypage/myMust/MyMust";
import MyPageMenu from "@/components/auth/mypage/MyPageMenu";
import PageTitle from "@/components/common/page/PageTitle";

function MyMustPage() {
  return (
    <>
      <PageTitle title="나의 자취템" />
      <MyPageMenu />
      <MyMust />
    </>
  );
}

export default MyMustPage;
