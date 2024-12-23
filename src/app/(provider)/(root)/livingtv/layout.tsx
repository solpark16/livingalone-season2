import { PropsWithChildren } from "react";

function LivingTvLayout({ children }: PropsWithChildren) {
  return (
    <>
      <main>{children}</main>
    </>
  );
}

export default LivingTvLayout;
