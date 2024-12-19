import { insertAlarm } from "@/apis/alarm";
import { TAddAlarm } from "@/types/types";
import { useMutation } from "@tanstack/react-query";

export default async function useAddAlarm(alarmData: TAddAlarm) {
  const { mutate: addAlarm } = useMutation({
    mutationFn: (chatAlarmData: TAddAlarm) => insertAlarm(chatAlarmData),
  });

  addAlarm(alarmData);
  return null;
}
