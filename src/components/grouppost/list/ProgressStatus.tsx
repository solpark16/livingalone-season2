"use client";
import Button from "@/components/common/button/Button";
import { useIsFinished } from "@/zustand/groupStore";
import { useEffect } from "react";

function ProgressStatus() {
  const isFinished = useIsFinished((state) => state.isFinished);
  const setIsFinished = useIsFinished((state) => state.setIsFinished);

  const activeStyle = (active: boolean) => ({
    bgColor: active ? "bg-white" : "bg-main-7",
    textColor: active ? "text-main-7" : "text-white",
    outline: active ? "border-main-7" : "",
  });

  useEffect(() => {
    return setIsFinished(false);
  }, [setIsFinished]);

  return (
    <div className="flex gap-[10px] py-[50px]">
      <Button
        {...activeStyle(isFinished)}
        content="진행중"
        onClick={() => setIsFinished(false)}
      />
      <Button
        {...activeStyle(!isFinished)}
        content="종료됨"
        onClick={() => setIsFinished(true)}
      />
    </div>
  );
}

export default ProgressStatus;
