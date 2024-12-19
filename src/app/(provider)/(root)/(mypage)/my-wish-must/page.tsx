import MyPageMenu from "@/components/auth/mypage/MyPageMenu";
import MyWishMustList from "@/components/auth/mypage/MyWishMust/MyWishMustList";
import PageTitle from "@/components/common/page/PageTitle";

function MyWishMustPage() {
  return (
    <>
      <PageTitle title="찜한 자취템" />
      <MyPageMenu />
      <MyWishMustList />
    </>
  );
}

export default MyWishMustPage;
