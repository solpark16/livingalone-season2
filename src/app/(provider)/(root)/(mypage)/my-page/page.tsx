import { mypageMenu } from "@/constants/mypage";
import Link from "next/link";

function MyPage() {
  return (
    <div className="w-full flex flex-col gap-8 items-center">
      <h2 className="font-bold">마이페이지</h2>
      <ul className="w-full flex flex-col gap-[10px]">
        {mypageMenu.map((menu) => (
          <li
            key={menu.href}
            className="w-full border border-main-6 rounded-lg text-center py-5"
          >
            <Link href={menu.href}>
              <h3 className="font-bold">{menu.label}</h3>
              <p className="text-gray-5 text-[14px] mt-[5px]">
                {menu.description}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MyPage;
