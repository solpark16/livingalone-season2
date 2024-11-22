import React, { PropsWithChildren } from "react";

function AuthBox({ children }: PropsWithChildren) {
  return (
    <div className="h-auto flex flex-col px-[25px] md:px-[50px] pb-[75px] border border-gray-1 bg-white">
      {children}
    </div>
  );
}

export default AuthBox;
