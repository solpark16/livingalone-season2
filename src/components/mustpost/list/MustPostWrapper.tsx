import Link from "next/link";
import { PropsWithChildren } from "react";
type MustPostWrapper = {
  postId: string;
};
function MustPostWrapper({ postId, children }: PropsWithChildren & MustPostWrapper) {
  return (
    <div className="must_post_card border border-gray-4 rounded-lg hover:border-main-7 box-border overflow-hidden">
      <Link href={`/mustpost/read/${postId}`}>{children}</Link>
    </div>
  );
}

export default MustPostWrapper;
