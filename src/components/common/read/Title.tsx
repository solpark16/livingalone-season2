interface TitleProps {
  title: string;
}
function Title({ title }: TitleProps) {
  return (
    <div className="flex flex-row items-center mb-3 md:mb-6">
      <h2 className="mb-1 md:mb-0 font-bold text-black text-[18px] md:text-[26px]">
        {title}
      </h2>
    </div>
  );
}

export default Title;
