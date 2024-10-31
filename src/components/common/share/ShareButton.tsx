"use client";

import { useState } from "react";
import ShareModal from "./ShareModal";

function ShareButton({
  postId,
  title,
  content,
  imgUrl,
}: {
  postId: string;
  title: string;
  content: string;
  imgUrl: string;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <p
        onClick={() => {
          setIsModalOpen(true);
        }}
        className="text-gray-5 cursor-pointer text-[13px] md:text-[14px]"
      >
        공유
      </p>
      {isModalOpen && (
        <ShareModal
          postId={postId}
          title={title}
          content={content}
          imgUrl={imgUrl}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}

export default ShareButton;
