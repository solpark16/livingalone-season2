import Link from "next/link";

type MainSectionTitleProps = {
  title: string;
  content: string;
  link: string;
};
function MainSectionTitle({ title, content, link }: MainSectionTitleProps) {
  return (
    <div className="flex justify-between items-end py-[40px]">
      <div>
        <h3 className="font-bold text-[26px] text-gray-6">{title}</h3>
        <p className="text-[16px] text-gray-5 mt-[10px]">{content}</p>
      </div>
      <div>
        <Link href={link}>더 많은 게시글 보기</Link>
      </div>
    </div>
  );
}

export default MainSectionTitle;
