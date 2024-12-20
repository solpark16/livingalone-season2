import Page from "@/components/common/page/Page";
import PaymentCheck from "@/components/payment/check/PaymentCheck";

function PaymentCheckPage({
  searchParams,
}: {
  searchParams: { paymentId: string; code: string };
}) {
  return (
    <Page>
      <PaymentCheck
        paymentId={searchParams.paymentId}
        code={searchParams.code}
      />
    </Page>
  );
}

export default PaymentCheckPage;
