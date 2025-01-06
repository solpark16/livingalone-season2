import { ChatMessage } from "@/types/types";
import Image from "next/image";

const ChatBubble = ({
  message,
  isCurrentUser,
  formatTime,
}: {
  message: ChatMessage;
  isCurrentUser: boolean;
  formatTime: (time: string) => string;
}) => {
  if (isCurrentUser) {
    return (
      <div className="flex flex-col justify-end">
        <div className="flex justify-end items-end gap-[10px]">
          <span className="text-gray-3 text-[10px] text-right">
            {formatTime(message.created_at)}
          </span>
          <div className="flex flex-col gap-1 p-[10px] bg-white rounded-lg">
            <span>{message.text}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-start">
      <div className="flex items-end text-gray-5 gap-[10px] mt-2">
        <div className="grid grid-cols-[32px_1fr] gap-2">
          <div className="relative overflow-hidden w-[32px] h-[32px] rounded-full aspect-square">
            <Image
              src={message.profiles.profile_image_url}
              alt={message.profiles.nickname}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col gap-1 p-[10px] bg-white rounded-lg">
            <span className="text-[10px] text-gray-3 truncate">
              {message.profiles.nickname}
            </span>
            <span>{message.text}</span>
          </div>
        </div>
        <span className="text-gray-3 text-[10px]">
          {formatTime(message.created_at)}
        </span>
      </div>
    </div>
  );
};

export default ChatBubble;
