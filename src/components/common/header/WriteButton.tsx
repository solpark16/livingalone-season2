"use client";
import { useIsOpen } from "@/zustand/isOpenStore";
import Link from "next/link";
import Button from "../button/Button";

function WriteButton() {
  const { isOpenWriteButton, setIsOpenWriteButton } = useIsOpen();

  return (
    <div className="relative ml-[26px] hidden md:block">
      {/* <button
        className="rounded-full py-[10px] px-[22px] border border-main-6 bg-main-6 text-[15px] text-white font-bold"
        onClick={() => setIsOpenWriteButton(!isOpenWriteButton)}
      >
        글쓰기
      </button> */}
      <Button
        bgColor="bg-main-6"
        textColor="text-white"
        content="글쓰기"
        onClick={() => setIsOpenWriteButton(!isOpenWriteButton)}
      />

      {isOpenWriteButton && (
        <ul className="z-50 absolute top-[39px] right-0 w-[168px] px-[22px] py-[29px] border border-main-6 text-center text-[16px] font-semibold text-gray-6 bg-white rounded-lg">
          <li className="w-auto bg-white text-[16px] hover:text-main-6 mb-[15px]">
            <Link href="/mustpost/write">자취템 자랑하기</Link>
          </li>
          <li className="bg-white hover:text-main-6">
            <Link href="/grouppost/write">공동구매 만들기</Link>
          </li>
        </ul>
      )}
    </div>
  );
}

export default WriteButton;
