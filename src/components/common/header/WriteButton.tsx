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

      {isOpenWriteButton && (
        <ul className="z-50 absolute right-[14px] top-[50px] w-[120px] border border-main-7">
          <li className="bg-white text-gray-3 text-[14px] hover:bg-main-7 hover:text-white text-center">
            <Link href="/mustpost/write" className="block py-[10px] ">
              자취템 자랑하기
            </Link>
          </li>
          <li className="bg-white text-gray-3 text-[14px] hover:bg-main-7 hover:text-white text-center border-t border-main-7">
            <Link href="/grouppost/write" className="block py-[10px] ">
              공동구매 만들기
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
}

export default WriteButton;
