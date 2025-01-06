"use client";
import { insertAlarm } from "@/apis/alarm";
import { useChatMessages } from "@/hooks/chat/useChatMessage";
import { createClient } from "@/supabase/client";
import { ChatMessage, TAddAlarm } from "@/types/types";
import { useAuthStore } from "@/zustand/authStore";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Confirm, Notify } from "notiflix";
import { useEffect, useRef, useState } from "react";
import ChatBubble from "./ChatBubble";
import ChatInput from "./ChatInput";

type TChat = {
  created_at: string;
  id: string;
  profiles: { user_id: string; nickname: string; profile_image_url: string };
  text: string;
  user_id: string;
};

export default function ChatForm({
  postId,
  userId,
  onClose,
  title,
}: {
  postId: string;
  userId: string;
  onClose: () => void;
  title: string;
}) {
  const supabase = createClient();
  const user = useAuthStore((state) => state.user);
  const id = user?.id as string;
  const { messages } = useChatMessages(postId);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const formatTime = (time: string) =>
    time.split("T").join(" ").substring(0, 16);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const { mutate: addAlarm } = useMutation({
    mutationFn: (chatAlarmData: TAddAlarm) => insertAlarm(chatAlarmData),
  });

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newMessage) return Notify.failure("내용을 입력해주세요.");

    if (!user) {
      Confirm.show(
        "로그인 후 이용 가능",
        "로그인하러 가시겠습니까?",
        "로그인 하기",
        "취소",
        () => {
          router.push("/login");
        },
        () => {
          return;
        }
      );
    }

    const offset = new Date().getTimezoneOffset() * 60000;
    const today = new Date(Date.now() - offset).toISOString();

    if (user) {
      const chatInfo = {
        created_at: today,
        text: newMessage,
        user_id: user.id,
        post_id: postId,
      };

      const { error } = await supabase.from("chat").insert(chatInfo);

      if (error) {
        Notify.failure(`채팅 전송에 실패했습니다. ${error}`);
      } else {
        setNewMessage("");
      }

      if (id !== userId) {
        const chatAlarmData = {
          type: "chat",
          user_id: userId,
          group_post_id: postId,
          must_post_id: null,
          link: `/grouppost/read/${postId}`,
          is_read: false,
        };
        addAlarm(chatAlarmData);
      }
    }
  };

  return (
    <div className=" z-[99] fixed inset-0 flex items-center justify-center px-[16px] py-[0px] md:px-0 md:py-[80px]">
      <div className="z-[999] relative w-full mx-auto top-[-30px] max-w-[300px] md:max-w-[370px] h-full max-h-[500px] md:max-h-[760px] ">
        <div className="flex items-center bg-blue-5 p-[15px] rounded-t-lg">
          <button onClick={onClose}>
            <svg
              width="12"
              height="22"
              viewBox="0 0 12 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M11 1L1 11L11 21" stroke="white" />
            </svg>
          </button>
          <h4 className="pl-[15px] text-white bold text-[18px] truncate">
            {title}
          </h4>
        </div>
        <div className="h-full flex flex-col justify-between items-center bg-white p-[15px] rounded-b-lg">
          {messages.length > 0 ? (
            <div className="overflow-y-scroll w-full custom_scrollbar flex flex-col gap-[10px]">
              {messages.map((message: ChatMessage) => (
                <ChatBubble
                  key={message.id}
                  message={message}
                  isCurrentUser={user?.id === message.user_id}
                  formatTime={formatTime}
                />
              ))}
              <div ref={messagesEndRef} />
            </div>
          ) : (
            <span className="text-gray-5 pt-[250px]">
              공구 채팅을 시작해보세요
            </span>
          )}
          <ChatInput
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            handleSendMessage={handleSendMessage}
          />
        </div>
      </div>
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
      ></div>
    </div>
  );
}
