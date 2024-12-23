import { PropsWithChildren } from "react";

function GroupPostLayout({ children }: PropsWithChildren) {
  return (
    <>
      <main>{children}</main>
    </>
  );
}

export default GroupPostLayout;
