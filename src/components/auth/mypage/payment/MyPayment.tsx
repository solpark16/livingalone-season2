"use client";
import Empty from "@/components/common/empty/Empty";
import Error from "@/components/common/error/Error";
import IsLoading from "@/components/common/loading/IsLoading";
import { useGetMyPayment } from "@/hooks/payment/useGetMyPayment";
import PaymentList from "./PaymentList";

function MyPayment() {
  const { payment, isPending, isError } = useGetMyPayment();

  if (isPending) return <IsLoading />;
  if (isError) return <Error />;

  return (
    <div className="w-full mt-8">
      {payment ? (
        <PaymentList payment={payment} />
      ) : (
        <Empty content="주문 내역이 없습니다." />
      )}
    </div>
  );
}

export default MyPayment;
