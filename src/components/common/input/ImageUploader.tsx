import Image from "next/image";

import IsLoading from "@/components/common/loading/IsLoading";
import useAddImage from "@/hooks/common/useAddImage";

interface ImageUploaderProps<T> {
  imgUrl: string;
  setImgUrl: React.Dispatch<React.SetStateAction<string>>;
  error: T;
  setError: React.Dispatch<React.SetStateAction<T>>;
  postType: "mustposts" | "groupposts" | "profile";
}

function ImageUploader<T extends { imageUrlError: string }>({
  imgUrl,
  setImgUrl,
  error,
  setError,
  postType,
}: ImageUploaderProps<T>) {
  const { addImageHandler, loading } = useAddImage(
    postType,
    setImgUrl,
    setError
  );

  return (
    <div className="flex flex-row gap-2 md:gap-[10px] items-start">
      <input
        className="hidden"
        id="image-file"
        type="file"
        accept="image/*"
        onChange={addImageHandler}
      />
      <label
        className="flex justify-center items-center shrink-0 w-[70px] md:w-[100px] aspect-square text-center font-bold text-sm md:text-base text-gray-4 bg-gray-1 cursor-pointer whitespace-pre-line rounded-lg"
        htmlFor="image-file"
      >
        {imgUrl ? `이미지\n수정` : `이미지\n업로드`}
      </label>
      {error.imageUrlError && (
        <p className={`text-red-6 text-[11px] mt-[3px]`}>
          {error.imageUrlError}
        </p>
      )}
      <div className="w-[70px] md:w-auto aspect-square rounded-[4px]">
        <div className="relative">
          {loading && (
            <div className="absolute inset-0 m-auto top flex justify-center items-center">
              <IsLoading />
            </div>
          )}
          {imgUrl && (
            <Image
              src={imgUrl}
              alt="포스팅한 이미지"
              width={100}
              height={100}
              className="bg-gray-5 rounded-[4px]"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ImageUploader;
