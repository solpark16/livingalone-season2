"use client";
import { useAuthStore } from "@/zustand/authStore";
import { useIsOpen } from "@/zustand/isOpenStore";
import Image from "next/image";
import Link from "next/link";
import Alarm from "../alarm/Alarm";
import SearchBar from "./SearchBar";

interface MobileHeaderProps {
  title?: string;
  hamburger?: boolean;
  alarm?: boolean;
}
function MobileHeader({
  title,
  hamburger = false,
  alarm = true,
}: MobileHeaderProps) {
  const user = useAuthStore((state) => state.user);
  const toggleIsOpenSideBar = useIsOpen((state) => state.toggleIsOpenSideBar);
  const handleOpenSideBar = () => {
    toggleIsOpenSideBar();
  };

  return (
    <div className="relative z-[999] md:hidden flex items-center justify-between px-3 py-[12px] bg-main-6">
      <div className="absolute left-[16px] top-[18px]">
        {hamburger && (
          <button onClick={handleOpenSideBar}>
            <Image
              src="/img/icon-hamburger.svg"
              alt="마이페이지 메뉴"
              width={24}
              height={24}
            />
          </button>
        )}
      </div>
      <SearchBar />
      <div className="text-[13px] font-medium text-white">
        {user && alarm && <Alarm />}
      </div>
    </div>
  );
}

export default MobileHeader;
