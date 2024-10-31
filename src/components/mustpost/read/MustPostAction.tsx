"use client";
import { useAuthStore } from "@/zustand/authStore";
import Link from "next/link";
import React from "react";
import MustDeleteBtn from "./MustDeleteBtn";

function MustPostAction({ userId, id }: { userId: string; id: string }) {
  const user = useAuthStore((state) => state.user);
  if (!user) {
    return null;
  }

  return (
    <>
      {user.id === userId && (
        <div className="flex md:justify-center md:items-center w-auto text-[13px] md:text-[14px]">
          ・
          <Link href={`/mustpost/edit/${id}`} className="grow">
            <button className="">수정</button>
          </Link>
          ・
          <MustDeleteBtn id={id} />
        </div>
      )}
    </>
  );
}

export default MustPostAction;
