"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

function GlobalNav() {
  const pathname = usePathname();
  return (
    <nav className="hidden md:block">
      <h2 className="hidden">주메뉴</h2>
      <ul className="flex gap-[30px] items-center text-[16px] font-semibold">
        <li>
          <Link
            href="/mustpost"
            className={`hover:text-main-7 ${
              pathname === "/mustpost" ? "text-main-7" : "text-gray-6"
            }`}
          >
            자랑해 자취템
          </Link>
        </li>
        <li>
          <Link
            href="/grouppost"
            className={`hover:text-main-7 ${
              pathname === "/grouppost" ? "text-main-7" : "text-gray-6"
            }`}
          >
            같이 사 공구템
          </Link>
        </li>
        <li>
          <Link
            href="/livingtv"
            className={`hover:text-main-7 ${
              pathname === "/livingtv" ? "text-main-7" : "text-gray-6"
            }`}
          >
            자취 티비
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default GlobalNav;
