import Label from "@/components/common/label/Label";
import Like from "@/components/common/like/Like";
import Image from "next/image";
import Link from "next/link";

interface GroupPostCardProps {
  application: {}[];
  title: string;
  price: number;
  peopleNum: number;
  isFinished: boolean;
  imgUrl: string;
  startDate: string;
  endDate: string;
  postId: string;
}

function GroupPostCard({
  application,
  title,
  price,
  peopleNum,
  isFinished,
  imgUrl,
  startDate,
  endDate,
  postId,
}: GroupPostCardProps) {
  return (
    <div className="relative border border-gray-4 hover:border-main-7 rounded-lg overflow-hidden">
      <Link href={`/grouppost/read/${postId}`}>
        <div className="flex flex-col md:flex-row">
          <div className="relative md:min-w-[40%] md:max-w-[232px] aspect-square rounded-bl-none md:rounded-br-none md:rounde-r-none overflow-hidden">
            <Image src={imgUrl} alt={title} fill quality={75} className="object-cover md:rounded-l-[6px]" />
          </div>
          <div className="px-[8px] py-[8px] md:py-[20px] md:pl-[26px] md:pr-[20px] w-full bg-white shrink-0">
            <div className="flex flex-col gap-[3px] md:gap-[5px]">
              <span className="font-semibold text-[10px] md:text-[13px] text-blue-6">
                {isFinished ? "종료됨" : "진행중"}
              </span>
              {/* pc */}
              <div className="hidden md:block text-[13px] text-gray-4">
                <span>{startDate}</span> ~ <span>{endDate}</span>
              </div>
              {/* mo */}
              <div className="md:hidden text-[12px] text-gray-4">
                <span>{startDate}</span> <br />~ <span>{endDate}</span>
              </div>
            </div>
            <span className="block mt-[10px] md:mt-[15px] text-[12px] md:text-[14px] text-gray-6">
              냉장고 보관 용기
            </span>
            <h4 className="mt-[5px] md:mt-[10px] font-bold text-[14px] md:text-[20px] text-gray-6 truncate md:line-clamp-2 md:h-[48px]">
              {title}
            </h4>
            {/* pc */}
            <p className="hidden md:block mt-[8px] font-bold text-[14px] text-gray-5">
              <span className="text-red-5">24,000원</span>을 <span className="text-red-5">{peopleNum + 1}명</span>이
              나눠서
            </p>
            {/* mo */}
            <p className="md:hidden mt-[5px] font-bold text-[12px] text-gray-5">
              <span className="text-red-5">24,000원</span>을 <br />
              <span className="text-red-5">{peopleNum + 1}명</span>이 나눠서
            </p>
            <span className="flex justify-end md:block mt-[5px] text-[14px] md:text-[20px] text-main-7 font-semibold truncate">
              {price.toLocaleString()}원
            </span>
            <div className="mt-[12px] flex justify-between md:justify-start gap-[10px]">
              <Label color="bg-red-1" textColor="text-red-5" name={`${peopleNum - application.length}명 남음`} />
              <Label color="bg-yellow-1" textColor="text-yellow-6" name="배송비 포함" />
            </div>
          </div>
        </div>
      </Link>
      <div className="absolute top-[10px] right-[10px] md:top-auto md:right-[20px] md:bottom-[20px]">
        <Like postId={postId} />
      </div>
    </div>
  );
}

export default GroupPostCard;
