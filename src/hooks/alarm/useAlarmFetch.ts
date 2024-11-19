import { getAlarms } from "@/apis/alarm";
import { TAlarm } from "@/types/types";
import { useAuthStore } from "@/zustand/authStore";
import { useQuery } from "@tanstack/react-query";

export default function useAlarmFetch() {
  const user = useAuthStore((state) => state.user);
  const userId = user?.id as string;

  const {
    data: alarms = [],
    isPending,
    isError,
  } = useQuery<TAlarm[]>({
    queryKey: ["alarm", userId],
    queryFn: () => getAlarms(userId),
    enabled: !!user,
  });

  return { userId, alarms, isPending, isError };
}
