"use client";
import { insertComment } from "@/apis/mustpost";
import { getMyProfile } from "@/apis/mypage";
import Button from "@/components/common/button/Button";
import { useAddAlarm } from "@/hooks/alarm/useAddAlarm";
import { Profile } from "@/types/types";
import { useAuthStore } from "@/zustand/authStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { Notify } from "notiflix";
import React, { useState } from "react";
import CommentProfile from "./CommentProfile";

export type TComment = {
  post_id: string;
  user_id: string;
  created_at: string | Date;
  content: string;
};

function CommentForm({ postId, userId }: { postId: string; userId: string }) {
  const user = useAuthStore((state) => state.user);
  const queryClient = useQueryClient();
  const [content, setContent] = useState("");
  const [countComment, setCountComment] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);
  const alarmMutation = useAddAlarm();

  const { data: profile } = useQuery<Profile | undefined>({
    queryKey: ["profile", user?.id],
    queryFn: () => (user ? getMyProfile(user.id) : undefined),
    enabled: !!user,
  });

  const setContentHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    setCountComment(e.target.value.length);
  };

  const { mutate: addComment } = useMutation({
    mutationFn: (newComment: TComment) => insertComment(newComment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
      setLoading(false);
    },
    onError: () => {
      setLoading(false);
    },
  });

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) {
      Notify.warning("로그인을 먼저 진행해주세요.");
      return;
    }

    if (!content.trim()) {
      Notify.warning("댓글을 입력해주세요.");
      return;
    }

    if (content.length > 500) {
      Notify.warning("500자 이내로 작성해주세요");
      return;
    }

    setLoading(true);

    // 한국 시간으로 넣기
    const offset = new Date().getTimezoneOffset() * 60000;
    const today = new Date(Date.now() - offset);

    const newComment = {
      post_id: postId,
      user_id: user.id,
      created_at: today,
      content,
    };

    addComment(newComment);
    setContent("");

    //알람 추가
    const alarmData = {
      type: "comment",
      user_id: userId,
      group_post_id: null,
      must_post_id: postId,
      link: `/mustpost/read/${postId}`,
      is_read: false,
    };
    alarmMutation.mutate(alarmData);
  };

  return (
    <div className="flex flex-col border border-gray-2 rounded-lg p-[10px] md:p-3 mb-[25px]">
      {profile && (
        <CommentProfile
          profileImg={profile?.profile_image_url}
          nickname={profile?.nickname}
        />
      )}

      <div className="mt-[10px] md:mt-[5px]">
        <form
          onSubmit={submitHandler}
          className="items-center flex flex-col relative gap-[5px] md:gap-[9px]"
        >
          {loading && (
            <div className="absolute inset-0 flex justify-center items-center z-50">
              <Image
                src="/img/loading-spinner-transparent.svg"
                alt="로딩중"
                width={80}
                height={80}
              />
            </div>
          )}
          <textarea
            value={content}
            placeholder="댓글을 입력하세요."
            cols={28}
            rows={3}
            maxLength={900}
            autoFocus={false}
            onChange={(e) => {
              setContentHandler(e);
            }}
            className="w-full flex-grow text-[14px] resize-none outline-none h-[52px] md:h-[45px]"
          ></textarea>
          <div className="ml-auto">
            <Button
              bgColor="bg-main-7"
              textColor="text-white"
              size="sm"
              content="등록"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default CommentForm;
