import React, { PropsWithChildren } from "react";

function AuthBox({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col w-[280px] md:w-[380px] px-[25px] md:px-[49px] pb-[75px] border border-gray-1 bg-white">
      {children}
    </div>
  );
}

export default AuthBox;
