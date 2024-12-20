import MyPageMenu from "@/components/auth/mypage/MyPageMenu";
import MyLikeGroupList from "@/components/auth/mypage/myLikeGroup/MyLikeGroupList";
import PageTitle from "@/components/common/page/PageTitle";

function MyLikeGroupPage() {
  return (
    <>
      <PageTitle title="좋아요 공구" />
      <MyPageMenu />
      <MyLikeGroupList />
    </>
  );
}

export default MyLikeGroupPage;
