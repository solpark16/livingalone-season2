"use client";

import useAlarmFetch from "@/hooks/alarm/useAlarmFetch";
import { useIsUnread } from "@/zustand/alarmStore";
import Empty from "../common/empty/Empty";
import Error from "../common/error/Error";
import IsLoading from "../common/loading/IsLoading";
import AlarmItem from "./AlarmItem";

function AlarmList() {
  const isUnread = useIsUnread((state) => state.isUnread);

  const { userId, alarms, isPending, isError } = useAlarmFetch();

  const unreadAlarms = alarms.filter((alarm) => !alarm.is_read);

  if (isPending) return <IsLoading />;
  if (isError) return <Error />;

  return (
    <div>
      <ul>
        {isUnread
          ? unreadAlarms.map((alarm) => (
              <li key={alarm.id}>
                <AlarmItem alarm={alarm} userId={userId} />
              </li>
            ))
          : alarms.map((alarm) => (
              <li key={alarm.id}>
                <AlarmItem alarm={alarm} userId={userId} />
              </li>
            ))}
      </ul>
      <div>{alarms.length === 0 && <Empty content="알람이 없습니다" />}</div>
    </div>
  );
}

export default AlarmList;
