import Link from "next/link";

function GlobalNav() {
  return (
    <nav className="hidden sm:block">
      <h2 className="hidden">주메뉴</h2>
      <ul className="flex gap-[34px] items-center text-[20px] font-bold">
        <li>
          <Link href="/mustpost">구해줘 자취템</Link>
        </li>
        <li>
          <Link href="/grouppost">같이 사 공구템</Link>
        </li>
      </ul>
    </nav>
  );
}

export default GlobalNav;
