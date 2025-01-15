import MobileBanner from "@/components/common/banner/MobileBanner";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";

export const revalidate = 3600;
function Banner() {
  return (
    <div className="bg-gradient-to-r from-[#DDFFCD] via-[#ddffcd] via-40% to-[#FFFCB0] to-50% border-b border-b-gray-3">
      <div className="relative w-full xl:max-w-[1200px] mx-auto hidden md:block">
        <Link href="/payment" prefetch={false}>
          <Image
            src="/img/lucky_banner.webp"
            alt="랜덤박스 구매하러가기"
            width={1200}
            height={345}
            className="h-auto w-full"
            priority
            quality={65}
            loading="eager"
            fetchPriority="high"
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwMCIgaGVpZ2h0PSIzNDUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI0RERkZDRCIvPjwvc3ZnPg=="
          />
        </Link>
      </div>
      <MobileBanner />
    </div>
  );
}

export default memo(Banner);
