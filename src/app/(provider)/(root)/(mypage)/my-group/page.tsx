import MyPageMenu from "@/components/auth/mypage/MyPageMenu";
import MyGroup from "@/components/auth/mypage/myGroup/MyGroup";
import PageTitle from "@/components/common/page/PageTitle";

function MyGroupPage() {
  return (
    <>
      <PageTitle title="내가 쓴 공구" />
      <MyPageMenu />
      <MyGroup />
    </>
  );
}

export default MyGroupPage;
