import MobileHeader from "@/components/common/header/MobileHeader";
import MobileNav from "@/components/common/header/MobileNav";
import Page from "@/components/common/page/Page";
import PaymentForm from "@/components/payment/form/PaymentForm";

function PaymentFormPage() {
  return (
    <>
      <MobileHeader title="주문서 작성" />
      <Page>
        <PaymentForm />
      </Page>
      <MobileNav />
    </>
  );
}

export default PaymentFormPage;
