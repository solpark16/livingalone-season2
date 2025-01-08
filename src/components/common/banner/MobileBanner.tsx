import Image from "next/image";
import Link from "next/link";

export const revalidate = 3600;
function MobileBanner() {
  return (
    <Link
      href="/payment"
      prefetch={false}
      className="flex justify-center items-center py-[22px] md:hidden aspect-[320/130] w-full max-w-[320px] mx-auto"
    >
      <Image
        src="/img/mobile-luckybox-banner.webp"
        alt="혼자살때 럭키박스"
        width={320}
        height={130}
        priority
        quality={65}
        loading="eager"
        fetchPriority="high"
        sizes="(max-width: 320px) 100vw, 320px"
      />
    </Link>
  );
}

export default MobileBanner;
