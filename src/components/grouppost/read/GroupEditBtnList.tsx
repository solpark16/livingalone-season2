"use client";

import { useAuthStore } from "@/zustand/authStore";
import Link from "next/link";
import GroupDeleteBtn from "./GroupDeleteBtn";

function GroupEditBtnList({ userId, id }: { userId: string; id: string }) {
  const user = useAuthStore((state) => state.user);
  return (
    <>
      {user && user.id === userId ? (
        <div className="flex md:justify-center md:items-center w-auto text-[13px] md:text-[14px]">
          ・
          <Link href={`/grouppost/edit/${id}`}>
            <button>수정</button>
          </Link>
          ・
          <GroupDeleteBtn id={id} />
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default GroupEditBtnList;
