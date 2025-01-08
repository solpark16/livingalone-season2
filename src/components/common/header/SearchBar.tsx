"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

function SearchBar() {
  const [searchValue, setSearchValue] = useState<string>("");
  const router = useRouter();
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/search?search=${searchValue}`);
    setSearchValue("");
  };
  return (
    <>
      <form
        className="flex flex-row w-[166px] md:w-[186px] px-[10px] py-[6px] md:border md:border-gray-3 text-[14px] md:text-[15px] bg-white rounded-full"
        onSubmit={handleSearch}
      >
        <div className="flex-shrink-0 relative w-4 md:w-5 aspect-square mr-[10px]">
          <Image
            src="/img/icon-search.svg"
            alt="검색버튼"
            fill
            className="object-cover"
          />
        </div>
        <input
          type="text"
          placeholder="검색어를 입력하세요"
          className="w-full outline-none text-[14px] md:text-[15px] text-gray-6"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </form>
    </>
  );
}

export default SearchBar;
