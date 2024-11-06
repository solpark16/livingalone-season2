import React from "react";

function SkeletonComments() {
  return (
    <div className="md:animate-pulse">
      <ul>
        {[...Array(7)].map((_, index) => (
          <li key={index} className="mb-[20px]">
            <div className="flex gap-[5px] mb-[10px] rounded">
              <div className="bg-gray-2 w-[24px] h-[24px] rounded-full"></div>
              <div className="bg-gray-2 w-[100px] h-[24px] rounded"></div>
            </div>
            <div className="bg-gray-2 w-[200px] h-[20px] mb-[10px] rounded"></div>
            <div className="bg-gray-2 w-[150px] h-[16px] mb-[10px] rounded"></div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SkeletonComments;
