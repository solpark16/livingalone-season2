import Button from "../common/button/Button";

interface ChatInputProps {
  newMessage: string;
  setNewMessage: (message: string) => void;
  handleSendMessage: (e: React.FormEvent) => Promise<void>;
}
function ChatInput({
  newMessage,
  setNewMessage,
  handleSendMessage,
}: ChatInputProps) {
  return (
    <form
      onSubmit={handleSendMessage}
      className="flex w-full items-center gap-1"
    >
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="채팅을 입력하세요."
        className="border border-gray-3 rounded-[4px] p-[8px] w-full grow text-[14px]"
      />
      <Button
        size="sm"
        bgColor="bg-blue-6"
        content="보내기"
        textColor="text-white"
      />
    </form>
  );
}

export default ChatInput;
