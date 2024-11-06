import Button from "@/components/common/button/Button";
import Image from "next/image";
import React from "react";

interface CommentEditProps {
  profileImg: string;
  nickname: string;
  handleUpdateComment: (e: React.FormEvent<HTMLFormElement>) => void;
  editComment: string;
  setEditComment: React.Dispatch<React.SetStateAction<string>>;
  handleCancelEdit: () => void;
}

function CommentEdit({
  profileImg,
  nickname,
  handleUpdateComment,
  editComment,
  setEditComment,
  handleCancelEdit,
}: CommentEditProps) {
  return (
    <div className=" w-full p-3 border border-gray-2 rounded-lg mb-5">
      <div className="flex">
        <div className="flex-shrink-0 relative mr-1 w-6 h-6">
          <Image
            src={profileImg}
            alt="유저 프로필 사진"
            fill
            className="rounded-full"
          />
        </div>
        <div className="flex-grow-1">
          <span className="inline-block font-semibold mb-1 text-gray-6 h-4 text-[13px]">
            {nickname}
          </span>
        </div>
      </div>
      <form onSubmit={handleUpdateComment} className="mt-[5px]">
        <div className="flex flex-col">
          <textarea
            value={editComment}
            cols={30}
            rows={2}
            maxLength={501}
            autoFocus={false}
            onChange={(e) => setEditComment(e.target.value)}
            className="w-full h-[45px] text-[14px] rounded-[4px] resize-none outline-none flex-grow-1"
          ></textarea>
        </div>

        <div className="flex flex-row justify-center items-center gap-1 w-[72px] mt-[9px] ml-auto flex-grow-0">
          <Button
            onClick={handleCancelEdit}
            bgColor="bg-main-7"
            textColor="text-white"
            size="sm"
            content="취소"
          />
          <Button
            bgColor="bg-main-7"
            textColor="text-white"
            size="sm"
            content="완료"
          />
        </div>
      </form>
    </div>
  );
}

export default CommentEdit;
