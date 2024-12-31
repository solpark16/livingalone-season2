"use client";

import Image from "next/image";
import { Notify } from "notiflix";
import KakaoShareButton from "./KakaoShareButton";

interface PropsType {
  postId: string;
  title: string;
  content: string;
  imgUrl: string;
  onClose: () => void;
}

function ShareModal({ postId, title, content, imgUrl, onClose }: PropsType) {
  const copyUrlHandler = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      Notify.success("링크가 복사되었습니다.");
    } catch (e) {
      Notify.failure("링크를 복사하지 못 했습니다.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[999]">
      <div className="z-10 px-5 md:px-[35px] py-[30px] w-[343px] md:w-[370px] box-border bg-white rounded-lg">
        <div className="flex justify-center">
          <h6 className="font-[700] text-[18px] md:text-xl text-blue-6 mb-5 md:mb-6">
            게시물 공유
          </h6>
        </div>
        <div className="flex flex-col justify-center gap-6 md:gap-0 md:justify-between items-center">
          <KakaoShareButton title={title} content={content} imgUrl={imgUrl} />
          <div className="hidden md:flex w-full p-[10px] border border-gray-3 rounded-lg items-center justify-between gap-2 mt-[22px]">
            <input
              value={window.location.href}
              readOnly
              className="w-full text-gray-6 text-[13px]"
            />
            <button
              className=" w-[37px] bg-main-7 shrink-0 rounded-[4px] h-[24px] text-white text-[13px] font-[700]"
              onClick={copyUrlHandler}
            >
              복사
            </button>
          </div>
          <button
            className="md:hidden border border-main-8 w-[92px] h-[44px] rounded-full text-xl text-main-8 bg-main-1"
            onClick={copyUrlHandler}
          >
            링크복사
          </button>
        </div>
      </div>
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black bg-opacity-50"
      ></div>
    </div>
  );
}

export default ShareModal;
