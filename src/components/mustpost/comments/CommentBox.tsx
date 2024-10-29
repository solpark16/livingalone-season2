import Image from "next/image";
import React from "react";

interface CommentBoxProps {
  profileImg: string;
  nickname: string;
  content: string;
}

function CommentBox({ profileImg, nickname, content }: CommentBoxProps) {
  return (
    <div className="gap-1 w-full text-gray-4">
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
      <p className="text-[14px] text-gray-6 whitespace-pre-wrap break-words text-justify leading-5 mb-[10px]">
        {content}
      </p>
    </div>
  );
}

export default CommentBox;
