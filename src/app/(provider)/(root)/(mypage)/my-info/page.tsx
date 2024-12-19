import AuthBox from "@/components/auth/common/AuthBox";
import ProfileForm from "@/components/auth/mypage/myInfo/ProfileForm";
import MyPageMenu from "@/components/auth/mypage/MyPageMenu";
import PageTitle from "@/components/common/page/PageTitle";

function MyInfoPage() {
  return (
    <>
      <PageTitle title="나의 정보" />
      <MyPageMenu />
      <AuthBox>
        <ProfileForm />
      </AuthBox>
    </>
  );
}

export default MyInfoPage;
