import { deleteAlarm, updateIsRead } from "@/apis/alarm";
import { TDeleteAlarm, TEditAlarm } from "@/types/types";
import { useAuthStore } from "@/zustand/authStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import AlarmAction from "./AlarmAction";
import AlarmContent from "./AlarmContent";
import AlarmImage from "./AlarmImage";

interface AlarmCardProps {
  content: string;
  type: "must" | "group";
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
}
function AlarmCard({ content, alarm, type }: AlarmCardProps) {
  const user = useAuthStore((state) => state.user);
  const userId = user?.id as string;
  const queryClient = useQueryClient();
  const post = type === "group" ? alarm.group_posts : alarm.must_posts;

  const invalidateAlarms = () =>
    queryClient.invalidateQueries({ queryKey: ["alarm", userId] });

  const { mutate: setIsRead } = useMutation({
    mutationFn: (editAlarm: TEditAlarm) => updateIsRead(editAlarm),
    onSuccess: invalidateAlarms,
  });

  const { mutate: closeAlarm } = useMutation({
    mutationFn: (closeAlarmInfo: TDeleteAlarm) => deleteAlarm(closeAlarmInfo),
    onSuccess: invalidateAlarms,
  });

  const handleClickAlarm = (alarmId: string) => {
    if (!alarm.is_read) {
      setIsRead({
        user_id: alarm.user_id,
        is_read: true,
        id: alarmId,
      });
    }
  };

  const handleCloseAlarm = (id: string) => {
    closeAlarm({
      user_id: alarm.user_id,
      id,
    });
  };

  return (
    <div className="flex justify-between py-[20px] px-[20px] items-center">
      <Link href={alarm.link} className="flex gap-[20px]">
        <AlarmImage post={post} />
        <AlarmContent alarm={alarm} post={post} content={content} />
      </Link>
      <AlarmAction
        alarm={alarm}
        handleClickAlarm={handleClickAlarm}
        handleCloseAlarm={handleCloseAlarm}
      />
    </div>
  );
}

export default AlarmCard;
