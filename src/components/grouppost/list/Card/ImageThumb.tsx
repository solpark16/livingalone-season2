import Image from "next/image";

interface ImageThumbProps {
  imgUrl: string;
  title: string;
}

function ImageThumb({ imgUrl, title }: ImageThumbProps) {
  return (
    <div className="relative md:min-w-[40%] md:max-w-[232px] aspect-square rounded-bl-none md:rounded-br-none md:rounde-r-none overflow-hidden">
      <Image src={imgUrl} alt={title} fill quality={75} className="object-cover md:rounded-l-[6px]" />
    </div>
  );
}

export default ImageThumb;
