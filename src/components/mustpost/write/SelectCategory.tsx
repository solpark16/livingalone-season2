"use client";
import { getCategories } from "@/apis/mustpost";
import { MustCategory } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";

interface SelectCategoryProps {
  initialCategoryName: string;
  selectCategory: (category: MustCategory) => void;
  error: string;
}

function SelectCategory({
  initialCategoryName,
  selectCategory,
  error,
}: SelectCategoryProps) {
  const [isOpen, setIsOpen] = useState(false);

  const {
    data: mustCategories,
    isPending,
    isError,
  } = useQuery<MustCategory[]>({
    queryKey: ["mustCategory"],
    queryFn: getCategories,
  });

  const handleIsOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsOpen((prev) => !prev);
  };

  const handleSelectCategory = (category: MustCategory) => {
    setIsOpen(false);
    selectCategory(category);
  };

  if (isPending)
    return (
      <div className="flex items-center">
        <span className="flex-shrink-0 inline-block w-[45px] md:w-[55px] mr-[13px] md:mr-5 text-[13px] md:text-base font-semibold text-gray-6">
          카테고리
        </span>
        <span className="inline-block w-[114px] h-[31px] md:h-[39px] pl-[2px] py-2 border-b border-gray-4 text-[13px] md:text-base"></span>
      </div>
    );

  if (isError) return <div>데이터 로딩에 실패했습니다!</div>;

  return (
    <div className="relative">
      <div>
        <div className="flex items-center">
          <span className="inline-block w-[45px] md:w-[55px] mr-[13px] md:mr-5 text-[13px] md:text-base font-semibold text-gray-6">
            카테고리
          </span>
          <div className="relative grow">
            <button
              className="flex items-center justify-between relative w-[114px] pl-[10px] py-[7px] border-b border-gray-4 text-xs md:text-[16px] md:text-base text-left text-gray-6"
              onClick={handleIsOpen}
            >
              {initialCategoryName}
              <Image
                src="/img/icon-input-must.svg"
                alt="카테고리 아이콘"
                width={10}
                height={5}
              />
            </button>
            {isOpen && (
              <ul className="z-50 flex flex-col items-start justify-center absolute translate-y-[9px] w-[116px] py-[4px] border border-gray-4 bg-white">
                {mustCategories?.map((category) => (
                  <li
                    key={category.id}
                    className="w-full text-gray-6 text-xs md:text-[16px]"
                  >
                    <button
                      onClick={() => handleSelectCategory(category)}
                      className="inline-flex justify-center w-full py-[5px] px-[16px]  hover:bg-yellow-2 tracking-wide md:tracking-normal"
                    >
                      {category.name}
                    </button>
                  </li>
                ))}
              </ul>
            )}
            {error && (
              <p className={`text-red-6 text-[11px] mt-[3px]`}>{error}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelectCategory;
