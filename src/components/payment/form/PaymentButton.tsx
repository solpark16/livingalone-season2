"use client";

import PortOne from "@portone/browser-sdk/v2";
import { useRouter } from "next/navigation";
import { Notify } from "notiflix";
import React, { Dispatch, SetStateAction } from "react";
import { v4 as uuidv4 } from "uuid";

type TPaymentInput = {
  purchaserName: string;
  purchaserPhone: string;
};

function PaymentButton({
  input,
  purchaserAddress,
  purchaserDetailAddress,
  purchaserEmail,
  firstCheckBox,
  secondCheckBox,
  setError,
}: {
  input: TPaymentInput;
  purchaserAddress: string;
  purchaserEmail: string;
  purchaserDetailAddress: string;
  firstCheckBox: boolean;
  secondCheckBox: boolean;
  setError: Dispatch<
    SetStateAction<{
      nameError: string;
      phoneError: string;
      emailError: string;
      addressError: string;
    }>
  >;
}) {
  const { purchaserName, purchaserPhone } = input;

  const router = useRouter();

  const paymentHandler = async () => {
    setError({
      nameError: "",
      phoneError: "",
      emailError: "",
      addressError: "",
    });
    if (!purchaserName.trim()) {
      setError((prev) => ({
        ...prev,
        nameError: "성함은 필수 입력입니다.",
      }));
      return;
    }
    if (!purchaserPhone.trim()) {
      setError((prev) => ({
        ...prev,
        phoneError: "연락처는 필수 입력입니다.",
      }));
      return;
    }
    const phone_regex = /^01([0|1|6|7|8|9])-([0-9]{3,4})-([0-9]{4})$/;
    if (!phone_regex.test(purchaserPhone)) {
      setError((prev) => ({
        ...prev,
        phoneError: "전화번호는 01X-XXXX-XXXX 형식으로 작성해주세요.",
      }));
      return;
    }
    if (!purchaserEmail.trim()) {
      setError((prev) => ({
        ...prev,
        emailError: "이메일은 필수 입력입니다.",
      }));
      return;
    }
    const email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
    if (!email_regex.test(purchaserEmail)) {
      setError((prev) => ({
        ...prev,
        emailError: "이메일을 정확히 입력해주세요.",
      }));
      return;
    }

    if (!firstCheckBox || !secondCheckBox) {
      Notify.failure("체크박스를 모두 체크해주세요.");
      return;
    }
    const response = await PortOne.requestPayment({
      // Store ID 설정
      storeId: `${process.env.NEXT_PUBLIC_STORE_ID}`,
      // 채널 키 설정
      channelKey: `${process.env.NEXT_PUBLIC_CHANNEL_KEY}`,
      paymentId: uuidv4(),
      orderName: "혼자살때 럭키박스",
      totalAmount: 1000,
      currency: "CURRENCY_KRW",
      payMethod: "CARD",
      customer: {
        fullName: purchaserName,
        phoneNumber: purchaserPhone,
        email: purchaserEmail,
        address: {
          addressLine1: purchaserAddress,
          addressLine2: purchaserDetailAddress,
        },
      },
      bypass: {
        inicis_v2: {
          acceptmethod: ["SKIN(#00B8A2)"],
        },
      },

      redirectUrl: `${process.env.NEXT_PUBLIC_SITE_URL}payment/check`,
    });

    if (response?.code != null) {
      return alert(response.message);
    }

    const paymentId = response?.paymentId;

    router.push(`/payment/check?paymentId=${paymentId}`);
  };

  return (
    <button
      className="w-full max-w-[300px] md:max-w-full md:w-[500px] py-[10px] md:py-[13px] bg-main-8 bold text-[20px] md:text-[22px] text-gray-1 rounded-full"
      onClick={paymentHandler}
    >
      결제하기
    </button>
  );
}

export default PaymentButton;
