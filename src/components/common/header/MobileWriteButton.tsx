import Link from "next/link";

function MobileWriteButton() {
  return (
    <>
      <div className="z-[998] absolute bottom-[45px] inset-x-0 w-screen py-[16px] px-[22px] bg-gray-1">
        <ul className="flex flex-col items-center text-[14px] text-white gap-[13px]">
          <li className="w-full">
            <Link
              href="/mustpost/write"
              className="block min-w-[276px] py-[10px] w-full mx-auto rounded-full bg-white text-center font-bold text-blue-5"
            >
              자취템 자랑하기
            </Link>
          </li>
          <li className="w-full">
            <Link
              href="/grouppost/write"
              className="block min-w-[276px] py-[10px] w-full mx-auto rounded-full bg-white text-center font-bold text-blue-5"
            >
              공동구매 만들기
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default MobileWriteButton;
