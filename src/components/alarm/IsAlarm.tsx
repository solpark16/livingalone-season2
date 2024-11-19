"use client";
import useAlarmFetch from "@/hooks/alarm/useAlarmFetch";
import Link from "next/link";

function Alarm() {
  const { alarms, isPending, isError } = useAlarmFetch();

  const isAlarm = alarms.some((alarm) => !alarm.is_read);

  if (isPending) return <div>로딩중</div>;

  if (isError) return <div>오류</div>;

  return (
    <Link href="/alarm" className={`flex gap-1 ${isAlarm && "text-yellow-2"}`}>
      알림
    </Link>
  );
}

export default Alarm;
