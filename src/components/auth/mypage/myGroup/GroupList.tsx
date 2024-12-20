import Button from "@/components/common/button/Button";
import Label from "@/components/common/label/Label";
import { TMainGroupPost } from "@/types/types";
import { useState } from "react";
import ApplyCard from "./ApplyCard";

interface GroupListProps {
  post: TMainGroupPost;
}
function GroupList({ post }: GroupListProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="flex justify-between rounded-lg bg-gray-1 p-5">
        <div className="flex flex-col items-start gap-3">
          <span>
            {post.is_finished ? (
              <Label color="bg-gray-3" textColor="text-gray-5" name="종료 ●" />
            ) : (
              <Label
                color="border border-main-7 bg-white"
                textColor="text-main-7"
                name="● 진행중"
              />
            )}
          </span>
          <div>
            <span className="text-[14px] text-gray-5">
              {post.start_date} ~ {post.end_date}
            </span>
            <h2 className="text-[18px] font-bold">{post.title}</h2>
          </div>
        </div>
        <div className="flex flex-col justify-between items-end">
          <span className="font-bold">
            {post.group_applications.length}명 / {post.people_num}명
          </span>
          <Button
            content="신청자 확인"
            bgColor={`hover:bg-blue-6 ${isOpen ? "bg-blue-6" : "bg-blue-5"}`}
            textColor="text-white"
            onClick={() => setIsOpen((prev) => !prev)}
          />
        </div>
      </div>
      {isOpen && <ApplyCard applications={post.group_applications} />}
    </>
  );
}

export default GroupList;
