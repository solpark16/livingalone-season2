"use client";

import { useAuthStore } from "@/zustand/authStore";
import { Notify } from "notiflix";
import { useState } from "react";
import GroupApplyModal from "./GroupApplyModal";

function GroupApplyBtn({
  id,
  achievementRate,
  userId,
}: {
  id: string;
  achievementRate: number;
  userId: string;
}) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const user = useAuthStore((state) => state.user);

  return (
    <>
      <button
        className="w-full md:w-[280px] flex justify-center items-center text-white font-[700] text-[15px] bg-main-6 rounded-full h-[35px] md:h-[32px]"
        onClick={() => {
          if (!user) {
            Notify.failure("로그인한 사용자만 신청할 수 있습니다.");
            return;
          }

          if (achievementRate === 100) {
            Notify.failure("현재 모집이 완료되었습니다.");
            return;
          }

          setIsModalOpen(true);
        }}
      >
        공구 신청하기
      </button>
      {isModalOpen && (
        <GroupApplyModal
          id={id}
          userId={userId}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}

export default GroupApplyBtn;
