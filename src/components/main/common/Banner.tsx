import Image from "next/image";
import Link from "next/link";

function Banner() {
  return (
    <div className="bg-gradient-to-r from-[#DDFFCD] to-[#FFFCB0] border border-b border-b-gray-3">
      <div className="relative w-full xl:max-w-[1200px] mx-auto">
        <Link href="/payment">
          <Image
            src="/img/lucky_banner.svg"
            alt="랜덤박스 구매하러가기"
            width={0}
            height={0}
            className="h-auto w-full"
            loading="lazy"
          />
        </Link>
      </div>
    </div>
  );
}

export default Banner;
