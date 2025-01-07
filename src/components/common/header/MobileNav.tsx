"use client";
import { useAuthStore } from "@/zustand/authStore";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Notify } from "notiflix";
import { useState } from "react";
import MobileWriteButton from "./MobileWriteButton";

function MobileNav() {
  const pathname = usePathname();
  const user = useAuthStore((state) => state.user);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => {
    setIsOpen(false);
  };
  const handleClickWrite = () => {
    if (!user) {
      setIsOpen(false);
      Notify.failure("로그인 후 이용이 가능합니다");
      router.push("/login");
    }
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <div className="md:hidden pt-[10px] pb-[15px] fixed bottom-0 inset-x-0 w-screen h-[60px] flex items-center shadow-[0_-4px_10px_0_rgba(0,0,0,0.1)] bg-white z-[999]">
        <div className="relative w-full mx-auto z-[100]">
          <ul className="w-full min-w-[320px] grid grid-cols-5">
            <li>
              <div className="flex flex-col justify-center items-center gap-[3px]">
                <button
                  onClick={handleClickWrite}
                  className="flex flex-col items-center gap-[3px]"
                >
                  <Image
                    src="/img/mo-icon-write.svg"
                    alt="글쓰기"
                    width={20}
                    height={20}
                  />
                  <span className="text-gray-6 text-[10px]">글쓰기</span>
                </button>
              </div>
            </li>
            <li>
              <Link href="/mustpost">
                <div className="flex flex-col justify-center items-center gap-[3px]">
                  {pathname === "/mustpost" ? (
                    <>
                      <Image
                        src="/img/mo-icon-must-on.svg"
                        alt="자취템"
                        width={20}
                        height={20}
                      />
                      <span className="text-[10px] text-main-6">자취템</span>
                    </>
                  ) : (
                    <>
                      <Image
                        src="/img/mo-icon-must.svg"
                        alt="자취템"
                        width={20}
                        height={20}
                      />
                      <span className="text-gray-6 text-[10px]">자취템</span>
                    </>
                  )}
                </div>
              </Link>
            </li>
            <li>
              <Link href="/">
                <div className="flex flex-col justify-center items-center gap-[3px]">
                  {pathname === "/" ? (
                    <>
                      <Image
                        src="/img/mo-icon-home-on.svg"
                        alt="홈"
                        width={20}
                        height={20}
                      />
                      <span className="text-[10px] text-main-6">홈</span>
                    </>
                  ) : (
                    <>
                      <Image
                        src="/img/mo-icon-home.svg"
                        alt="홈"
                        width={20}
                        height={20}
                      />
                      <span className="text-gray-6 text-[10px]">홈</span>
                    </>
                  )}
                </div>
              </Link>
            </li>
            <li>
              <Link href="/grouppost">
                <div className="flex flex-col justify-center items-center gap-[3px]">
                  {pathname === "/grouppost" ? (
                    <>
                      <Image
                        src="/img/mo-icon-group-on.svg"
                        alt="공구템"
                        width={20}
                        height={20}
                      />
                      <span className="text-[10px] text-main-6">공구템</span>
                    </>
                  ) : (
                    <>
                      <Image
                        src="/img/mo-icon-group.svg"
                        alt="공구템"
                        width={20}
                        height={20}
                      />
                      <span className="text-[10px] text-gray-6">공구템</span>
                    </>
                  )}
                </div>
              </Link>
            </li>
            <li>
              {user ? (
                <Link href="/my-page">
                  <div className="flex flex-col justify-center items-center gap-[3px]">
                    {pathname === "/my-page" ? (
                      <>
                        <Image
                          src="/img/mo-icon-mypage-on.svg"
                          alt="마이페이지"
                          width={20}
                          height={20}
                        />
                        <span className="text-[10px] text-main-6">
                          마이페이지
                        </span>
                      </>
                    ) : (
                      <>
                        <Image
                          src="/img/mo-icon-mypage.svg"
                          alt="마이페이지"
                          width={20}
                          height={20}
                        />
                        <span className="text-[10px] text-gray-6">
                          마이페이지
                        </span>
                      </>
                    )}
                  </div>
                </Link>
              ) : (
                <Link href="/login">
                  <div className="flex flex-col justify-center items-center gap-[3px]">
                    {pathname === "/login" || pathname === "/join" ? (
                      <>
                        <Image
                          src="/img/mo-icon-mypage-on.svg"
                          alt="마이페이지"
                          width={20}
                          height={20}
                        />
                        <span className="text-[10px] text-main-6">로그인</span>
                      </>
                    ) : (
                      <>
                        <Image
                          src="/img/mo-icon-mypage.svg"
                          alt="마이페이지"
                          width={20}
                          height={20}
                        />
                        <span className="text-[10px] text-gray-6">로그인</span>
                      </>
                    )}
                  </div>
                </Link>
              )}
            </li>
          </ul>
          {isOpen && <MobileWriteButton />}
        </div>
      </div>
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black bg-opacity-50"
        ></div>
      )}
    </>
  );
}

export default MobileNav;
