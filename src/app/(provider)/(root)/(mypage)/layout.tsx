import Page from "@/components/common/Page/Page";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { PropsWithChildren } from "react";

function MyPagelayout({
  children,
  params,
}: PropsWithChildren & { params: Params }) {
  console.log(params);
  return <Page>{children}</Page>;
}

export default MyPagelayout;
