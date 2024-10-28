import Image from "next/image";

function Empty() {
  return (
    <div className="min-h-[400px] md:min-h-screen flex justify-center">
      <div className="flex flex-col justify-center items-center mb-[64px]">
        <div className="relative w-[67px] md:w-[100px] h-[62px] md:h-[94px] mb-5">
          <Image src="/img/icon-empty.png" alt="empty" layout="fill" />
        </div>
        <h4 className="text-gray-5 text-[16px]">해당 카테고리에 맞는 게시글이 없습니다.</h4>
      </div>
    </div>
  );
}

export default Empty;
