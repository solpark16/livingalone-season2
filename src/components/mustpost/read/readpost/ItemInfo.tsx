import React from "react";

interface ItemInfoProps {
  item: string;
  price: number;
  location: string;
  name: string;
}

function ItemInfo({ item, price, location, name }: ItemInfoProps) {
  return (
    <div className="flex flex-col gap-[11px]">
      <div>
        <span className="inline-flex justify-center  py-[7px] px-[17px] rounded-full font-bold text-[14px] text-main-7 border border-main-7">
          {name}
        </span>
      </div>

      <div className="md:pl-1 justify-between">
        <div>
          <h5 className="mb-[11px] pl-1 md:pl-0 text-[22px] md:text-2xl font-bold text-black">
            {item}
          </h5>
          <p className="text-gray-6">
            판매처: {location} | 가격: {price.toLocaleString()}원
          </p>
          {/* <span className="pl-1 md:pl-0 text-gray-3 text-[18px]">
            {location}
          </span> */}
          {/* <span className="block mt-2 pl-1 font-bold text-[18px] text-black md:hidden">
            {price.toLocaleString()}원
          </span> */}
        </div>
        {/* <span className="shrink-0 hidden font-bold text-2xl text-black md:inline">
          {price.toLocaleString()}원
        </span> */}
      </div>
    </div>
  );
}

export default ItemInfo;
