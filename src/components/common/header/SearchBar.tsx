import Image from "next/image";

function SearchBar() {
  return (
    <>
      <form className="flex flex-row w-[166px] md:w-[186px] px-[10px] py-[6px] md:border md:border-gray-3 text-[14px] md:text-[15px] bg-white rounded-full">
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
        />
      </form>
    </>
  );
}

export default SearchBar;
