"use client";
import Button from "@/components/common/button/Button";
import { useGetMyPayment } from "@/hooks/payment/useGetMyPayment";
import Image from "next/image";

function MyPayment() {
  const { payment, isPending, isError } = useGetMyPayment();

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="border border-gray-4 rounded-lg p-[30px] bg-white">
        {payment && (
          <div className="flex flex-col gap-[15px]">
            <span
              className={`${
                payment.status === "CANCELLED" ? "text-red-5" : "text-main-7"
              } text-[18px] font-bold`}
            >
              {payment?.status}
            </span>
            <div className="relative w-full h-[200px]">
              <Image
                src="/img/thumb_luckybox.png"
                fill
                alt="럭키박스 썸네일"
                className="object-cover"
              />
            </div>
            <h4 className="font-bold">주문자 정보</h4>
            <ul>
              <li>{payment.name}</li>
              <li>{payment.phone}</li>
            </ul>
            <ul>
              <li>{payment.address}</li>
              <li>{payment.email}</li>
            </ul>
            {!(payment.status === "CANCELLED") && (
              <Button
                type="button"
                size="lg"
                content="환불하기"
                textColor="text-white"
                bgColor="bg-red-5"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyPayment;
