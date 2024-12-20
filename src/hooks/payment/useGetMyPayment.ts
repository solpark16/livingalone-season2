import { getMyPayment } from "@/apis/payment";
import { Payment } from "@/types/types";
import { useAuthStore } from "@/zustand/authStore";
import { useQuery } from "@tanstack/react-query";

export function useGetMyPayment() {
  const user = useAuthStore((state) => state.user);
  const userId = user?.id as string;
  const {
    data: payment,
    isPending,
    isError,
  } = useQuery<Payment>({
    queryKey: ["payment", userId],
    queryFn: () => getMyPayment(userId),
  });

  return { payment, isPending, isError };
}
