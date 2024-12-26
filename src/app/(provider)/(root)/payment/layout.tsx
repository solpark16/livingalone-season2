import { PropsWithChildren } from "react";

function PaymentLayout({ children }: PropsWithChildren) {
  return (
    <>
      <main className="bg-lime-1">{children}</main>
    </>
  );
}

export default PaymentLayout;
