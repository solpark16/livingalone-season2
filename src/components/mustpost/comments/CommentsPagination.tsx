import React from "react";

interface CommentsPaginationProps {
  totalPages: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

function CommentsPagination({
  totalPages,
  page,
  setPage,
}: CommentsPaginationProps) {
  return (
    <div className="flex justify-center pt-[10px] md:pt-[50px] gap-2">
      {[...Array(totalPages)].map((_, index) => {
        return (
          <button
            className={`w-5 h-5 border-[1px] flex justify-center items-center text-[12px] rounded-[4px] font-semibold
          ${
            page === index + 1
              ? "text-main-7 border-main-7"
              : "text-gray-4 border-gray-4"
          }`}
            key={index + 1}
            onClick={() => setPage(index + 1)}
          >
            {index + 1}
          </button>
        );
      })}
    </div>
  );
}

export default CommentsPagination;
