import Like from "@/components/common/like/Like";
import Link from "next/link";
import { PropsWithChildren } from "react";

type GroupPostWrapper = {
  postId: string;
};

function GroupPostWrapper({ postId, children }: PropsWithChildren & GroupPostWrapper) {
  return (
    <div className="relative border border-gray-4 hover:border-main-7 rounded-lg overflow-hidden">
      <Link href={`/grouppost/read/${postId}`}>
        <div className="flex flex-col md:flex-row">{children}</div>
      </Link>
      <div className="absolute top-[10px] right-[10px] md:top-auto md:right-[20px] md:bottom-[20px]">
        <Like postId={postId} />
      </div>
    </div>
  );
}

export default GroupPostWrapper;
