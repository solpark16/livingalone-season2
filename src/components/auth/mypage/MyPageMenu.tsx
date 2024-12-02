"use client";
import { mypageMenu } from "@/constants/mypage";
import Link from "next/link";
import { usePathname } from "next/navigation";

function MyPageMenu() {
  const pathname = usePathname();
  return (
    <ul className="flex items-center mt-[30px] mb-[40px]">
      {mypageMenu.map((menu) => (
        <li
          key={menu.href}
          className={`border-r border-gray-4 py-0 leading-none px-4 last:border-none font-semibold ${
            pathname === menu.href ? "text-main-7" : "text-gray-4"
          }`}
        >
          <Link href={menu.href}>{menu.label}</Link>
        </li>
      ))}
    </ul>
  );
}

export default MyPageMenu;
