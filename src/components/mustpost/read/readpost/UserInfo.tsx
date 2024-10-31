import Image from "next/image";
interface UserInfoProps {
  profile_image_url: string;
  nickname: string;
  created_at: string;
  postId: string;
}
function UserInfo({
  profile_image_url,
  nickname,
  created_at,
  postId,
}: UserInfoProps) {
  return (
    <div className="flex flex-row justify-between items-center gap-2 px-1 md:ml-[2px] mb-[10px] md:mb-[20px] border-t border-b py-[10px]">
      <div className="flex items-center gap-[10px]">
        <div className="relative w-10 h-10">
          <Image
            src={profile_image_url}
            alt="프로필 이미지"
            fill
            objectFit="cover"
            className="rounded-full"
          />
        </div>
        <span className="text-[13px] text-black">{nickname}</span>
      </div>
      <div className="flex flex-col">
        <span className="text-[13px] text-gray-6">
          작성일. {created_at.split("T").join(" ").substring(0, 10)}
        </span>
      </div>
    </div>
  );
}

export default UserInfo;
