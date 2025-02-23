import Button from "@/components/common/button/Button";

type MainSectionTitleProps = {
  title: string;
  content: string;
  link: string;
};
function MainSectionTitle({ title, content, link }: MainSectionTitleProps) {
  return (
    <div className="flex justify-between items-end pt-[40px] pb-[12px] md:pb-[40px]">
      <div>
        <h3 className="font-bold text-[18px] md:text-[26px] text-gray-6">
          {title}
        </h3>
        <p className="text-[12px] md:text-[16px] text-gray-5 mt-[3px] md:mt-[10px]">
          {content}
        </p>
      </div>
      <div className="hidden md:block">
        <Button
          bgColor="bg-main-2"
          textColor="text-main-7"
          href={link}
          content="더 많은 게시물 보기"
        />
      </div>
    </div>
  );
}

export default MainSectionTitle;
