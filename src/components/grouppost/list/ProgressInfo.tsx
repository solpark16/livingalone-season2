interface ProgressInfo {
  isFinished: boolean;
  startDate: string;
  endDate: string;
}
function ProgressInfo({ isFinished, startDate, endDate }: ProgressInfo) {
  return (
    <div className="flex flex-col gap-[3px] md:gap-[5px]">
      <span className={`font-semibold text-[10px] md:text-[13px] ${isFinished ? "text-red-5" : "text-blue-6"}`}>
        {isFinished ? "종료됨" : "진행중"}
      </span>
      {/* pc */}
      <div className="hidden md:block text-[13px] text-gray-4">
        <span>{startDate}</span> ~ <span>{endDate}</span>
      </div>
      {/* mo */}
      <div className="md:hidden text-[12px] text-gray-4">
        <span>{startDate}</span> <br />~ <span>{endDate}</span>
      </div>
    </div>
  );
}

export default ProgressInfo;
