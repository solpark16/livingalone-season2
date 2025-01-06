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
          <span className="text-gray-4 text-[10px] w-[53px]">
            {formatTime(message.created_at)}
          </span>
          <div className="flex flex-col gap-1 p-[10px] bg-yellow-1 text-gray-6 text-[14px] rounded-lg">
            <span>{message.text}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-start">
      <div className="flex items-end text-gray-5 gap-[10px] mt-2">
        <div className="grid grid-cols-[40px_1fr] gap-2">
          <div className="relative overflow-hidden w-[40px] h-[40px] rounded-full aspect-square">
            <Image
              src={message.profiles.profile_image_url}
              alt={message.profiles.nickname}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <span className="text-[12px] text-gray-6 font-semibold truncate">
              {message.profiles.nickname}
            </span>
            <div className="flex flex-col gap-1 p-[10px] bg-yellow-1 rounded-lg max-w-[180px]">
              <span className="text-[14px] text-gray-6">{message.text}</span>
            </div>
          </div>
        </div>
        <span className="text-gray-4 text-[10px] w-[53px]">
          {formatTime(message.created_at)}
        </span>
      </div>
    </div>
  );
};

export default ChatBubble;
