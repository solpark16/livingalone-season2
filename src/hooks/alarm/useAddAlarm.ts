import { insertAlarm } from "@/apis/alarm";
import { TAddAlarm } from "@/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useAddAlarm() {
  const queryClinet = useQueryClient();
  return useMutation({
    mutationFn: (data: TAddAlarm) => insertAlarm(data),
    onSettled: () => queryClinet.invalidateQueries({ queryKey: ["alarm"] }),
  });
}
