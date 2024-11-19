"use client";
import { useIsUnread } from "@/zustand/alarmStore";
import Button from "../common/button/Button";

function IsReadFilter() {
  const isUnread = useIsUnread((state) => state.isUnread);
  const setIsUnread = useIsUnread((state) => state.setIsUnread);

  const activeStyle = (active: boolean) => ({
    bgColor: active ? "bg-gray-2" : "bg-main-2",
    textColor: active ? "text-gray-5" : "text-main-7",
  });

  return (
    <div className="flex gap-[10px] pt-[20px] pb-[15px]">
      <Button
        {...activeStyle(isUnread)}
        content="전체"
        onClick={() => setIsUnread(false)}
      />
      <Button
        {...activeStyle(!isUnread)}
        content="읽지 않음"
        onClick={() => setIsUnread(true)}
      />
    </div>
  );
}

export default IsReadFilter;
