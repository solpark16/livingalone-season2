import { Notify } from "notiflix";
import imageCompression from "browser-image-compression";
import { useMutation } from "@tanstack/react-query";
import { insertMustImage } from "@/apis/mustpost";
import { useState } from "react";
import Image from "next/image";
import { TMustError } from "@/types/types";
import IsLoading from "@/components/common/loading/IsLoading";

interface AddMustImageProps {
  imgUrl: string;
  setImgUrl: React.Dispatch<React.SetStateAction<string>>;
  error: TMustError;
  setError: React.Dispatch<React.SetStateAction<TMustError>>;
}

function AddMustImage({
  imgUrl,
  setImgUrl,
  error,
  setError,
}: AddMustImageProps) {
  const [loading, setLoading] = useState<boolean>(false);

  const { mutate: addImage } = useMutation({
    mutationFn: async (newMustPostImage: File) => {
      const formData = new FormData();
      formData.append("file", newMustPostImage);

      setLoading(true);
      const response = await insertMustImage(formData);
      setImgUrl(
        `https://wtgehzvyirdsifnqqfzn.supabase.co/storage/v1/object/public/mustposts/${response.path}`
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
      const newMustPostImage = e.target.files[0];
      const fileType = newMustPostImage.type;

      if (newMustPostImage && !fileType.includes("image")) {
        Notify.failure("이미지 파일만 업로드 해주세요");
        return;
      }

      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1000,
        useWebWorker: true,
      };

      const compressedFile = await imageCompression(newMustPostImage, options);

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

export default AddMustImage;
