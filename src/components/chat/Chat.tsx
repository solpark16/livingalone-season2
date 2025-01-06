"use client";

import { useState } from "react";
import ChatForm from "./ChatForm";
interface ChatProps {
  postId: string;
  userId: string;
  title: string;
}

function Chat({ postId, userId, title }: ChatProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const onClose = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <div className="flex justify-center">
        <button
          onClick={() => setIsModalOpen(true)}
          className="text-white rounded-full w-full md:w-[280px] font-[700] text-[15px] flex items-center justify-center h-[35px] md:h-[32px] bg-blue-4 hover:bg-blue-6"
        >
          실시간 채팅
        </button>
      </div>
      {isModalOpen && (
        <ChatForm
          postId={postId}
          userId={userId}
          onClose={onClose}
          title={title}
        />
      )}
    </>
  );
}
export default Chat;
