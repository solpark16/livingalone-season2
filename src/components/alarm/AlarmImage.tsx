import Image from "next/image";
interface AlarmImageProps {
  post: {
    img_url: string;
    title: string;
  };
}
function AlarmImage({ post }: AlarmImageProps) {
  return (
    <Image
      src={post?.img_url}
      alt={post?.title}
      width={60}
      height={60}
      className="w-[60px] h-[60px] rounded-full shrink-0"
      loading="lazy"
    />
  );
}

export default AlarmImage;
