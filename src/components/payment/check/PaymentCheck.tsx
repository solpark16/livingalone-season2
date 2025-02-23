"use client";

import { insertPayment, refundPayment } from "@/apis/payment";
import IsLoading from "@/components/common/loading/IsLoading";
import { TNewPayment } from "@/types/types";
import { useAuthStore } from "@/zustand/authStore";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Notify } from "notiflix";
import { useEffect, useRef } from "react";

function PaymentCheck({
  paymentId,
  code,
}: {
  paymentId: string;
  code: string;
}) {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();
  const hasRun = useRef(false);

  const addMutation = useMutation({
    mutationFn: async (newPayment: TNewPayment) => {
      await insertPayment(newPayment);
    },
  });
  useEffect(() => {
    if (user && !hasRun.current) {
      const handlePayment = async () => {
        if (code === "FAILURE_TYPE_PG" || code === "PORTONE_ERROR") {
          Notify.failure("결제가 취소되었습니다.");
          return router.push("/payment");
        }
        if (paymentId) {
          try {
            const postPaymentHistory = async () => {
              const cancelResponse = await refundPayment(paymentId);
              if (cancelResponse.data.cancellation.status !== "SUCCEEDED") {
                Notify.failure("마이페이지 > 결제 내역에서 환불해주세요.");
                throw new Error(
                  `Cancellation failed: ${cancelResponse.statusText}`
                );
              }
              const notified = await fetch(
                `/api/payment/complete?paymentId=${paymentId}`
              );
              const paymentData = await notified.json();
              if (paymentData.status === "PAID") {
                Notify.failure(
                  "즉시 환불에 실패했습니다. 마이페이지 > 결제 내역에서 환불해주세요."
                );
              }
              if (paymentData.status === "FAILED") {
                Notify.failure("결제에 실패했습니다. 다시 시도해주세요.");
                router.push("/payment");
                return;
              }
              if (paymentData && user) {
                const newPayment: TNewPayment = {
                  id: paymentId,
                  name: paymentData.customer.name,
                  address: paymentData.customer.address.oneLine,
                  phone: paymentData.customer.phoneNumber,
                  email: paymentData.customer.email,
                  user_id: user?.id,
                  status: paymentData.status,
                };
                addMutation.mutate(newPayment);
              }
              Notify.success("결제 및 환불이 완료되었습니다.");
              router.push(`/payment/complete?paymentId=${paymentId}`);
            };
            postPaymentHistory();
          } catch (error) {
            Notify.failure(
              "즉시 환불에 실패했습니다. 마이페이지 > 결제 내역에서 환불해주세요."
            );
          }
        }
      };
      handlePayment();

      hasRun.current = true;
    }
  }, [user, code, paymentId, router]);

  return <IsLoading />;
}

export default PaymentCheck;
