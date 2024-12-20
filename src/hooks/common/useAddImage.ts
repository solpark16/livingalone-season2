import { insertGroupImage } from "@/apis/grouppost";
import { insertMustImage } from "@/apis/mustpost";
import { uploadImage } from "@/apis/mypage";
import { useMutation } from "@tanstack/react-query";
import imageCompression from "browser-image-compression";
import { Notify } from "notiflix";
import { useState } from "react";

export default function useAddImage<T extends { imageUrlError: string }>(
  postType: "mustposts" | "groupposts" | "profile",
  setImgUrl: React.Dispatch<React.SetStateAction<string>>,
  setError: React.Dispatch<React.SetStateAction<T>>
) {
  const [loading, setLoading] = useState<boolean>(false);

  const { mutate: addImage } = useMutation({
    mutationFn: async (newPostImage: File) => {
      const formData = new FormData();
      formData.append("file", newPostImage);

      setLoading(true);

      const response =
        postType === "mustposts"
          ? await insertMustImage(formData)
          : postType === "groupposts"
          ? await insertGroupImage(formData)
          : await uploadImage(formData);

      setImgUrl(
        `https://wtgehzvyirdsifnqqfzn.supabase.co/storage/v1/object/public/${postType}/${response.path}`
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

  return { addImageHandler, loading };
}
