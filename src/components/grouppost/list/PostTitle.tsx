interface PostTitleProps {
  title: string;
}
function PostTitle({ title }: PostTitleProps) {
  return (
    <h4 className="mt-[5px] md:mt-[10px] font-bold text-[14px] md:text-[20px] text-gray-6 truncate md:line-clamp-2 md:h-[48px]">
      {title}
    </h4>
  );
}

export default PostTitle;
