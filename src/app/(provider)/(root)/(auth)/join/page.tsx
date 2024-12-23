import AuthBox from "@/components/auth/common/AuthBox";
import AuthTitle from "@/components/auth/common/AuthTitle";
import JoinForm from "@/components/auth/login-join/join/JoinForm";
import Page from "@/components/common/page/Page";

function JoinPage() {
  return (
    <>
      <main className="bg-main-1">
        <Page>
          <AuthBox>
            <AuthTitle title="회원가입" />
            <JoinForm />
          </AuthBox>
        </Page>
      </main>
    </>
  );
}

export default JoinPage;
