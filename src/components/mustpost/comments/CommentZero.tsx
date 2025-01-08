import Image from "next/image";

function CommentZero() {
  return (
    <div className="flex flex-col justify-center items-center pt-[23px] pb-[16px]">
      <div className="relative w-[67px] md:w-[100px] h-[62px] md:h-[94px] mb-5">
        <Image src="/img/icon-empty.png" alt="empty" layout="fill" />
      </div>
      <span className="text-gray-2 text-[16px] mb-1">댓글이 없습니다.</span>
      <span className="text-gray-2 text-[16px]">첫 댓글을 작성해 보세요!</span>
    </div>
  );
}

export default CommentZero;
