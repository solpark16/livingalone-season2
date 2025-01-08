import Image from "next/image";

interface CommentProfileProps {
  profileImg: string;
  nickname: string;
}

function CommentProfile({ profileImg, nickname }: CommentProfileProps) {
  return (
    <div className="flex items-center gap-[5px] mb-[10px]">
      <div className="relative flex-shrink-0 w-6 h-6">
        <Image
          src={profileImg}
          alt="프로필 이미지"
          fill
          className="rounded-full"
        />
      </div>
      <div className="flex flex-col text-[13px] text-gray-6 font-semibold">
        <span>{nickname}</span>
      </div>
    </div>
  );
}

export default CommentProfile;
