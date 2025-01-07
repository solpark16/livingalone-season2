import Image from "next/image";
import Link from "next/link";
import { memo } from "react";

function Banner() {
  return (
    <div className="bg-gradient-to-r from-[#DDFFCD] to-[#FFFCB0] border-b border-b-gray-3">
      <div className="relative w-full xl:max-w-[1200px] mx-auto hidden md:block">
        <Link href="/payment">
          <Image
            src="/img/lucky_banner.svg"
            alt="랜덤박스 구매하러가기"
            width={0}
            height={0}
            className="h-auto w-full"
            priority
            quality={75}
            loading="eager"
            fetchPriority="high"
          />
        </Link>
      </div>
    </div>
  );
}

export default memo(Banner);
