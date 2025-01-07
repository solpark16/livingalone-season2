import { memo } from "react";

interface AlarmActionProps {
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
  handleClickAlarm: (id: string) => void;
  handleCloseAlarm: (id: string) => void;
}
function AlarmAction({
  alarm,
  handleClickAlarm,
  handleCloseAlarm,
}: AlarmActionProps) {
  return (
    <div className="shrink-0 text-[16px] text-gray-5">
      {!alarm.is_read && (
        <button
          onClick={() => handleClickAlarm(alarm.id)}
          className="hover:font-bold"
        >
          읽음
        </button>
      )}
      <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
      <button
        onClick={() => handleCloseAlarm(alarm.id)}
        className="hover:font-bold"
      >
        삭제
      </button>
    </div>
  );
}

export default memo(AlarmAction);
