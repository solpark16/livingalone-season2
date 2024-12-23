import Image from "next/image";

interface ImageThumbProps {
  imgUrl: string;
  item: string;
}

function ImageThumb({ imgUrl, item }: ImageThumbProps) {
  return (
    <div className="overflow-hidden relative aspect-square rounded-t-lg rounded-b-none">
      <Image
        src={imgUrl}
        alt={item}
        fill
        sizes="(max-width: 1024px) 70vw, 50vw"
        className="object-cover"
        quality={75}
      />
    </div>
  );
}

export default ImageThumb;
