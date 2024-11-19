interface PriceInfoProps {
  regularPrice: number;
  price: number;
}
function PriceInfo({ regularPrice, price }: PriceInfoProps) {
  return (
    <>
      <p className="flex justify-end md:block mt-[5px] md:mt-[8px] font-bold text-[12px] md:text-[14px]">
        <span className="text-red-5 line-through">
          {regularPrice && regularPrice.toLocaleString()}원
        </span>
      </p>
      <span className="flex justify-end md:block text-[14px] md:text-[20px] text-main-7 font-semibold truncate">
        {price.toLocaleString()}원
      </span>
    </>
  );
}

export default PriceInfo;
