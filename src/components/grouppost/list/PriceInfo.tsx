interface PriceInfoProps {
  price: number;
  peopleNum: number;
}
function PriceInfo({ peopleNum, price }: PriceInfoProps) {
  return (
    <>
      {/* pc */}
      <p className="hidden md:block mt-[8px] font-bold text-[14px] text-gray-5">
        <span className="text-red-5">24,000원</span>을 <span className="text-red-5">{peopleNum + 1}명</span>이 나눠서
      </p>
      {/* mo */}
      <p className="md:hidden mt-[5px] font-bold text-[12px] text-gray-5">
        <span className="text-red-5">24,000원</span>을 <br />
        <span className="text-red-5">{peopleNum + 1}명</span>이 나눠서
      </p>
      <span className="flex justify-end md:block mt-[5px] text-[14px] md:text-[20px] text-main-7 font-semibold truncate">
        {price.toLocaleString()}원
      </span>
    </>
  );
}

export default PriceInfo;
