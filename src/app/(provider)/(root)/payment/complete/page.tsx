import Page from "@/components/common/page/Page";
import PaymentComplete from "@/components/payment/complete/PaymentComplete";

function PaymentCompletePage({
  searchParams,
}: {
  searchParams: { paymentId: string };
}) {
  return (
    <Page>
      <PaymentComplete paymentId={searchParams.paymentId} />
    </Page>
  );
}

export default PaymentCompletePage;
