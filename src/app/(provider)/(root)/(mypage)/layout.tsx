import Page from "@/components/common/page/Page";
import { PropsWithChildren } from "react";

function MyPagelayout({ children }: PropsWithChildren) {
  return <Page>{children}</Page>;
}

export default MyPagelayout;
