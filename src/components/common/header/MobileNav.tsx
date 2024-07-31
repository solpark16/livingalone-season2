import Image from "next/image";
import Link from "next/link";

function MobileNav() {
  return (
    <div className="sm:hidden z-[99] fixed bottom-0 left-0 flex justify-center w-screen border-t border-slate-300 bg-white">
      <ul className="w-full max-w-[375px] min-w-[320px] py-[15px] grid grid-cols-5 ">
        <li>
          <Link href="">
            <div className="flex flex-col justify-center items-center gap-[5px]">
              <Image src="/img/mo-icon-write.png" alt="글쓰기" width={20} height={20} />
              <span className="text-[10px] text-slate-500">글쓰기</span>
            </div>
          </Link>
        </li>
        <li>
          <Link href="/mustpost">
            <div className="flex flex-col justify-center items-center gap-[5px]">
              <Image src="/img/mo-icon-must.png" alt="자취템" width={20} height={20} />
              <span className="text-[10px] text-slate-500">자취템</span>
            </div>
          </Link>
        </li>
        <li>
          <Link href="/">
            <div className="flex flex-col justify-center items-center gap-[5px]">
              <Image src="/img/mo-icon-home.png" alt="홈" width={20} height={20} />
              <span className="text-[10px] text-slate-500">홈</span>
            </div>
          </Link>
        </li>
        <li>
          <Link href="/grouppost">
            <div className="flex flex-col justify-center items-center gap-[5px]">
              <Image src="/img/mo-icon-group.png" alt="공구템" width={20} height={20} />
              <span className="text-[10px] text-slate-500">공구템</span>
            </div>
          </Link>
        </li>
        <li>
          <Link href="/mypage">
            <div className="flex flex-col justify-center items-center gap-[5px]">
              <Image src="/img/mo-icon-mypage.png" alt="마이페이지" width={20} height={20} />
              <span className="text-[10px] text-slate-500">마이페이지</span>
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default MobileNav;
