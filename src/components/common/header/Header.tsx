"use client";
import { useAuthStore } from "@/zustand/authStore";
import Image from "next/image";
import Link from "next/link";
import AuthHeader from "./AuthHeader";
import GlobalNav from "./GlobalNav";
import SearchBar from "./SearchBar";
import WriteButton from "./WriteButton";

function Header() {
  const user = useAuthStore((state) => state.user);

  return (
    <header className="border-b border-b-gray-3">
      <AuthHeader />
      <div className="container mx-auto w-full max-w-[1200px] flex items-center py-4 px-10 lg:px-0">
        <h1 className="text-[30px] font-extrabold">
          <Link href="/">
            <Image src="/img/logo.svg" alt="혼자살때" width={146} height={28} />
          </Link>
        </h1>
        <div className="flex items-center justify-between w-full pl-[50px]">
          <GlobalNav />
          <div className="flex flex-row">
            <SearchBar />
            {user && <WriteButton />}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
