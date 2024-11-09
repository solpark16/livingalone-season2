import { Notify } from "notiflix";
import imageCompression from "browser-image-compression";
import { useMutation } from "@tanstack/react-query";
import { insertMustImage } from "@/apis/mustpost";
import { useState } from "react";
import Image from "next/image";

import IsLoading from "@/components/common/loading/IsLoading";
import { insertGroupImage } from "@/apis/grouppost";

interface ImageUploaderProps<T> {
  imgUrl: string;
  setImgUrl: React.Dispatch<React.SetStateAction<string>>;
  error: T;
  setError: React.Dispatch<React.SetStateAction<T>>;
  postType: "must" | "group";
}

function ImageUploader<T extends { imageUrlError: string }>({
  imgUrl,
  setImgUrl,
  error,
  setError,
  postType,
}: ImageUploaderProps<T>) {
  const [loading, setLoading] = useState<boolean>(false);

  const { mutate: addImage } = useMutation({
    mutationFn: async (newPostImage: File) => {
      const formData = new FormData();
      formData.append("file", newPostImage);

      setLoading(true);

      const response =
        postType === "must"
          ? await insertMustImage(formData)
          : await insertGroupImage(formData);

      postType === "must"
        ? setImgUrl(
            `https://wtgehzvyirdsifnqqfzn.supabase.co/storage/v1/object/public/mustposts/${response.path}`
          )
        : setImgUrl(
            `https://wtgehzvyirdsifnqqfzn.supabase.co/storage/v1/object/public/groupposts/${response.path}`
          );
      setLoading(false);
    },
  });

  const addImageHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setError((prev) => ({
      ...prev,
      imageUrlError: "",
    }));
    if (e.target.files) {
      const newPostImage = e.target.files[0];
      const fileType = newPostImage.type;

      if (newPostImage && !fileType.includes("image")) {
        Notify.failure("이미지 파일만 업로드 해주세요");
        return;
      }

      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1000,
        useWebWorker: true,
      };

      const compressedFile = await imageCompression(newPostImage, options);

      addImage(compressedFile);
    }
  };
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
        <p className={`text-red-3 text-[12px] mt-2`}>{error.imageUrlError}</p>
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
