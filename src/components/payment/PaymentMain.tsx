"use client";

import { getPaymentAll } from "@/apis/payment";
import { useGetMyPayment } from "@/hooks/payment/useGetMyPayment";
import { useAuthStore } from "@/zustand/authStore";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Notify } from "notiflix";
import Error from "../common/error/Error";
import IsLoading from "../common/loading/IsLoading";

function PaymentMain() {
  const user = useAuthStore((state) => state.user);
  const userId = user?.id as string;
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
        {/* 이미지 div */}
        <Image
          src="/img/luckybox-main.svg"
          alt="럭키박스 메인 이미지"
          width={0}
          height={0}
          placeholder="blur"
          className="w-full h-auto"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO8Wg8AAi8BVvC05AcAAAAASUVORK5CYII="
        />
        {/* <Image
          src="/img/luckybox-subtitle.svg"
          alt="혼자살때 럭키박스 선착순 100명"
          width={0}
          height={0}
          className="w-full h-auto hidden md:block"
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO8Wg8AAi8BVvC05AcAAAAASUVORK5CYII="
        /> */}
      </div>
      <div className="flex flex-col gap-[22px] text-center">
        <span className="inline-block font-light text-[28px] text-gray-6 tracking-normal">
          자취에 꼭 필요한 5만원 상당의
          <br />
          필수템이 랜덤하게 들어가 있습니다.
        </span>
        <span className="inline-block text-[34px] font-extrabold text-main-7 tracking-normal">
          단 돈 1000원!
          <br />
          지금 바로 구매해보세요
        </span>
      </div>
      <div className="flex flex-col items-center mt-[50px]">
        {/* 글 div */}
        <div className="relative">
          <span className="inline-block w-[161px] bg-red-5 py-[7px] text-white rounded-full text-base font-bold text-center after:pointer">
            남은 럭키박스 {100 - paymentCount}개!
          </span>
        </div>

        <button
          onClick={onClickPaymentBtnHandler}
          className="font-bold text-[20px] md:text-[24px] text-white bg-black py-[10px] md:py-[16px] w-full max-w-[300px] md:w-[450px] md:max-w-full rounded-full"
        >
          구매하기
        </button>
      </div>
    </div>
  );
}

export default PaymentMain;

// top-[-55px] left-[calc(50%-94px)]
