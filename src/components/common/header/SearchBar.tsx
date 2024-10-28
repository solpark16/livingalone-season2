import Image from "next/image";

function SearchBar() {
  return (
    <>
      <form className="flex flex-row w-[186px] px-[10px] py-[6px] border border-gray-3 rounded-full text-[15px]">
        <Image
          src="/img/icon-search.svg"
          alt="검색버튼"
          width={20}
          height={20}
          className="flex-shrink-0 mr-[10px]"
        />
        <input
          type="text"
          placeholder="검색어를 입력하세요"
          className="w-full outline-none text-[15px] text-gray-6"
        />
      </form>
    </>
  );
}

export default SearchBar;
