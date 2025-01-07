import { memo } from "react";

interface AlarmContentProps {
  alarm: {
    id: string;
    user_id: string;
    is_read: boolean;
    type: string;
    created_at: string;
    group_posts: {
      img_url: string;
      title: string;
    };
    must_posts: {
      img_url: string;
      title: string;
    };
    link: string;
  };
  post: {
    img_url: string;
    title: string;
  };
  content: string;
}
function AlarmContent({ alarm, post, content }: AlarmContentProps) {
  return (
    <div className="flex flex-col gap-1 text-[16px]">
      <div className="text-gray-5 text-[14px] font-bold">
        {alarm.created_at.split("T").join(" ").substring(0, 10)}
      </div>
      <h5 className="text-main-7 max-w-[430px] truncate font-bold">
        {post?.title}
      </h5>
      <p className="text-gray-6">{content}</p>
    </div>
  );
}

export default memo(AlarmContent);
