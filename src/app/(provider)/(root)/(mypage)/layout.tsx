import Page from "@/components/common/Page/Page";
import { PropsWithChildren } from "react";

function MyPagelayout({ children }: PropsWithChildren) {
  return <Page>{children}</Page>;
}

export default MyPagelayout;
