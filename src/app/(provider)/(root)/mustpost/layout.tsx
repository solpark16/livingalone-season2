import { PropsWithChildren } from "react";

function MustPostLayout({ children }: PropsWithChildren) {
  return (
    <>
      <main>{children}</main>
    </>
  );
}

export default MustPostLayout;
