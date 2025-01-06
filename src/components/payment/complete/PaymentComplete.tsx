"use client";

import Button from "@/components/common/button/Button";

function PaymentComplete({ paymentId }: { paymentId: string }) {
  return (
    <div className="flex flex-col justify-center items-center gap-7 w-[350px] md:w-[700px] py-[88px] text-gray-6 bg-white rounded-lg">
      <h3 className="text-[20px] md:text-[24px] font-bold text-main-7 ">
        주문이 완료되었습니다!
      </h3>
      <h4 className="text-[17px] md:text-[18px]">
        저희 프로젝트를 위해 결제해주신
        <br />
        1000원은 즉시 <span className="font-bold text-red-5">
          자동환불
        </span>{" "}
        됩니다
      </h4>
      <div className="p-3 md:p-5 text-center bg-gray-1 rounded-lg">
        <span className="text-[13px]">주문번호: {paymentId}</span>
      </div>
      <Button
        href={"/mypage/mypayment"}
        size="lg"
        bgColor="bg-main-7"
        textSize="text-[15px] md:text-[17px]"
        textColor="text-white"
        content="결제내역 보러가기"
      />
    </div>
  );
}

export default PaymentComplete;
