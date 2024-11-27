import { PropsWithChildren } from "react";

function Page({ children }: PropsWithChildren) {
  return (
    <div className="container mx-auto max-w-full xl:max-w-[1200px] pt-[40px] md:pt-[70px] pb-[150px] md:pb-[250px] min-h-screen px-[12px] xl:px-0">
      <div className="flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
}

export default Page;
