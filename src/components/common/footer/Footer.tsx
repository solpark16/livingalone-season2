import Image from "next/image";
import Link from "next/link";

function Footer() {
  return (
    <footer className="hidden md:block py-[25px] absolute bottom-0 left-0 right-0 border-t border-gray-3 bg-white box-border">
      <div className="container flex flex-row items-center justify-between mx-auto w-full max-w-[1200px] px-10 lg:px-0">
        <h1 className="text-[20px] font-bold">
          <Link href="/">
            <Image
              src="/img/logo-footer.svg"
              alt="혼자살때"
              width={0}
              height={0}
              className="w-[80px] h-auto"
            />
          </Link>
        </h1>
        <p className=" text-gray-4 text-[12px]">Copyright © ㄱ6ㄴ6콩</p>
        <ul className="flex items-center justify-end text-[16px] gap-[11px]">
          <li>
            <a
              href="https://github.com/solpark16/livingalone-season2/"
              target="_blank"
              title="깃헙으로 이동"
            >
              <Image
                src="/img/icon-github.svg"
                alt="깃헙 아이콘"
                width={20}
                height={20}
              />
            </a>
          </li>
          <li>
            <a
              href="https://nifty-hockey-6b6.notion.site/2-174c1938761380e09b8ace1edae13052?pvs=4"
              target="_blank"
              title="노션으로 이동"
            >
              <Image
                src="/img/icon-notion.svg"
                alt="노션 아이콘"
                width={16}
                height={19}
              />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
