"use client";
import { TAlarm } from "@/types/types";
import AlarmCard from "./AlarmCard";

function AlarmItem({ alarm }: { alarm: TAlarm }) {
  return (
    <div>
      {alarm.type === "chat" && (
        <AlarmCard
          content="게시글에 채팅이 왔습니다"
          type="group"
          alarm={alarm}
        />
      )}
      {alarm.type === "apply" && (
        <AlarmCard
          content="게시글에 공구 신청이 왔습니다"
          type="group"
          alarm={alarm}
        />
      )}
      {alarm.type === "comment" && (
        <AlarmCard
          content="게시글에 댓글이 달렸습니다."
          type="must"
          alarm={alarm}
        />
      )}
    </div>
  );
}

export default AlarmItem;
