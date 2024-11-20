"use client";

import useAlarmFetch from "@/hooks/alarm/useAlarmFetch";
import { useIsUnread } from "@/zustand/alarmStore";
import Empty from "../common/empty/Empty";
import Error from "../common/error/Error";
import IsLoading from "../common/loading/IsLoading";
import AlarmItem from "./AlarmItem";

function AlarmList() {
  const isUnread = useIsUnread((state) => state.isUnread);
  const { alarms = [], isPending, isError } = useAlarmFetch();

  const unreadAlarms = alarms.filter((alarm) => !alarm.is_read);
  const displayedAlarms = isUnread ? unreadAlarms : alarms;

  if (isPending) return <IsLoading />;
  if (isError) return <Error />;
  if (displayedAlarms.length === 0) return <Empty content="알람이 없습니다" />;

  return (
    <div>
      <ul className="w-full flex flex-col gap-2">
        {displayedAlarms.map((alarm) => (
          <li
            key={alarm.id}
            className={`rounded-md ${
              alarm.is_read ? "bg-gray-1" : "bg-main-2"
            }`}
          >
            <AlarmItem alarm={alarm} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AlarmList;
