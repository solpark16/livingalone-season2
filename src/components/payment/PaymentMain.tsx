"use client";

import { getPaymentAll } from "@/apis/payment";
import { useGetMyPayment } from "@/hooks/payment/useGetMyPayment";
import { useAuthStore } from "@/zustand/authStore";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Notify } from "notiflix";
import Button from "../common/button/Button";
import Error from "../common/error/Error";
import IsLoading from "../common/loading/IsLoading";

function PaymentMain() {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  const { data: paymentCount } = useQuery({
    queryKey: ["payment"],
    queryFn: getPaymentAll,
  });
  const { payment, isPending, isError } = useGetMyPayment();
  const onClickPaymentBtnHandler = () => {
    if (!user) {
      Notify.failure("로그인된 사용자만 구매 가능합니다.");
      return;
    }
    if (payment) {
      Notify.failure("럭키박스를 이미 구매하셨습니다.");
      return;
    }
    router.push("/payment/form");
  };
  if (isPending) return <IsLoading />;

  if (isError) return <Error />;
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full">
        <Image
          src="/img/luckybox-main.webp"
          alt="럭키박스 메인 이미지"
          width={932}
          height={807}
          className="hidden md:block"
          priority
        />
        <Image
          src="/img/luckybox-mobile-main.webp"
          alt="럭키박스 메인 이미지"
          width={320}
          height={527}
          className="block md:hidden"
        />
      </div>
      <div className="flex flex-col gap-[22px] text-center">
        <span className="inline-block font-light text-[18px] md:text-[28px] text-gray-6">
          자취에 꼭 필요한 5만원 상당의
          <br />
          필수템이 랜덤하게 들어가 있습니다.
        </span>
        <span className="inline-block text-[20px] md:text-[34px] font-extrabold text-main-7 tracking-normal">
          단 돈 1000원!
          <br />
          지금 바로 구매해보세요
        </span>
      </div>
      <div className="flex flex-col items-center mt-[50px]">
        <div className="relative mb-[16px]">
          <span className="inline-block w-[161px] bg-red-5 py-[7px] text-white rounded-full text-base font-bold text-center after:pointer">
            남은 럭키박스 {100 - paymentCount}개!
          </span>
        </div>
        <Button
          size="lg"
          width="w-[271px] md:w-[340px]"
          height="h-[57px] md:h-[76px]"
          bgColor="bg-black"
          textColor="text-white"
          textSize="text-lg md:text-[28px]"
          content="랜덤박스 구매하기"
          onClick={onClickPaymentBtnHandler}
        />
      </div>
    </div>
  );
}

export default PaymentMain;
