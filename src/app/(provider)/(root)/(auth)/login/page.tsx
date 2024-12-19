import Page from "@/components/common/page/Page";

import AuthBox from "@/components/auth/common/AuthBox";
import AuthTitle from "@/components/auth/common/AuthTitle";
import LoginForm from "@/components/auth/login-join/login/LoginForm";
import MobileHeader from "@/components/common/header/MobileHeader";
import MobileNav from "@/components/common/header/MobileNav";
import IsOpenProvider from "@/providers/IsOpenProvider";

function LoginPage() {
  return (
    <>
      <MobileHeader title="로그인" alarm={false} />
      <IsOpenProvider>
        <main className="bg-main-1">
          <Page>
            <AuthBox>
              <AuthTitle title="로그인" />
              <LoginForm />
            </AuthBox>
          </Page>
        </main>
      </IsOpenProvider>
      <MobileNav />
    </>
  );
}

export default LoginPage;
