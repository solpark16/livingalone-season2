import Wish from "@/components/common/wish/Wish";

interface TitleProps {
  postId: string;
  title: string;
}
function Title({ title, postId }: TitleProps) {
  return (
    <div className="flex flex-row items-center mb-3 md:mb-6">
      {/* <div className="shrink-0 hidden md:block">
        <Wish postId={postId} />
      </div> */}
      <h2 className="mb-1 md:mb-0 font-bold text-black text-[18px] md:text-[26px]">
        {title}
      </h2>
    </div>
  );
}

export default Title;
