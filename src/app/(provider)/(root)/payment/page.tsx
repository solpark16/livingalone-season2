import MobileHeader from "@/components/common/header/MobileHeader";
import MobileNav from "@/components/common/header/MobileNav";
import Page from "@/components/common/page/Page";
import PaymentMain from "@/components/payment/PaymentMain";
import IsOpenProvider from "@/providers/IsOpenProvider";

function PaymentPage() {
  return (
    <Page>
      <PaymentMain />
    </Page>
  );
}

export default PaymentPage;
