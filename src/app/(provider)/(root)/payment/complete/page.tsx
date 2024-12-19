import MobileHeader from "@/components/common/header/MobileHeader";
import MobileNav from "@/components/common/header/MobileNav";
import Page from "@/components/common/page/Page";
import PaymentComplete from "@/components/payment/complete/PaymentComplete";

function PaymentCompletePage({
  searchParams,
}: {
  searchParams: { paymentId: string };
}) {
  return (
    <>
      <MobileHeader />
      <Page>
        <PaymentComplete paymentId={searchParams.paymentId} />
      </Page>
      <MobileNav />
    </>
  );
}

export default PaymentCompletePage;
