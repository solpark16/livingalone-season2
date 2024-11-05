import Label from "@/components/common/label/Label";

interface LabelInfoProps {
  peopleNum: number;
  application: {}[];
  isFree: boolean;
}

function LabelInfo({ peopleNum, application, isFree }: LabelInfoProps) {
  return (
    <div className="mt-[12px] flex justify-between md:justify-start gap-[10px]">
      <Label color="bg-red-1" textColor="text-red-5" name={`${peopleNum - application.length}명 남음`} />
      {isFree && <Label color="bg-yellow-1" textColor="text-yellow-6" name="배송비 포함" />}
    </div>
  );
}

export default LabelInfo;
