import { deleteAlarm, updateIsRead } from "@/apis/alarm";
import { TDeleteAlarm, TEditAlarm } from "@/types/types";
import { useAuthStore } from "@/zustand/authStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";

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

  const { mutate: setIsRead } = useMutation({
    mutationFn: (editAlarm: TEditAlarm) => updateIsRead(editAlarm),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["alarm", userId] }),
  });

  const { mutate: closeAlarm } = useMutation({
    mutationFn: (closeAlarmInfo: TDeleteAlarm) => deleteAlarm(closeAlarmInfo),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["alarm", userId] }),
  });

  const handleClickAlarm = (alarmId: string) => {
    if (!alarm.is_read) {
      const editAlarmInfo = {
        user_id: alarm.user_id,
        is_read: true,
        id: alarmId,
      };
      setIsRead(editAlarmInfo);
    }
  };

  const handleCloseAlarm = (id: string) => {
    const closeAlarmInfo = {
      user_id: alarm.user_id,
      id,
    };
    closeAlarm(closeAlarmInfo);
  };

  return (
    <div className="flex justify-between py-[20px] px-[20px] items-center">
      <Link href={alarm.link} className="flex gap-[20px]">
        <Image
          src={
            type === "group" && alarm.group_posts
              ? alarm.group_posts?.img_url
              : alarm.must_posts?.img_url
          }
          alt={
            type === "group" && alarm.group_posts
              ? alarm.group_posts.title
              : alarm.must_posts.title
          }
          width={60}
          height={60}
          className="w-[60px] h-[60px] rounded-full shrink-0"
        />

        <div className="flex flex-col gap-1 text-[16px]">
          <div className="text-gray-5 text-[14px] font-bold">
            {alarm.created_at.split("T").join(" ").substring(0, 10)}
          </div>
          <h5 className="text-main-7 max-w-[430px] truncate font-bold">
            {type === "group" && alarm.group_posts
              ? alarm.group_posts.title
              : alarm.must_posts.title}
            ㅇ테스트ㅇ테스트ㅇ테스트ㅇ테스트ㅇ테스트ㅇ테스트ㅇ테스트ㅇ테스트ㅇ테스트ㅇ테스트ㅇ테스트ㅇ테스트
          </h5>
          <p className="text-gray-6">{content}</p>
        </div>
      </Link>
      <div className="shrink-0 text-[16px] text-gray-5">
        <button
          onClick={() => handleClickAlarm(alarm.id)}
          className="hover:font-bold"
        >
          읽음
        </button>
        <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
        <button
          onClick={() => handleCloseAlarm(alarm.id)}
          className="hover:font-bold"
        >
          삭제
        </button>
      </div>
    </div>
  );
}

export default AlarmCard;
