import MyPageMenu from "@/components/auth/mypage/MyPageMenu";
import MyPayment from "@/components/auth/mypage/payment/MyPayment";
import PageTitle from "@/components/common/page/PageTitle";

function MyPaymentsPage() {
  return (
    <>
      <PageTitle title="결제 내역" />
      <MyPageMenu />
      <MyPayment />
    </>
  );
}

export default MyPaymentsPage;
