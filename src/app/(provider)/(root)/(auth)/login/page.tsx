import Page from "@/components/common/page/Page";

import AuthBox from "@/components/auth/common/AuthBox";
import AuthTitle from "@/components/auth/common/AuthTitle";
import LoginForm from "@/components/auth/login-join/login/LoginForm";

function LoginPage() {
  return (
    <>
      <main className="bg-main-1">
        <Page>
          <AuthBox>
            <AuthTitle title="로그인" />
            <LoginForm />
          </AuthBox>
        </Page>
      </main>
    </>
  );
}

export default LoginPage;
