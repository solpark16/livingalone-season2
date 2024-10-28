import Image from "next/image";

function IsLoading() {
  return (
    <div className="flex justify-center items-center">
      <Image src="/img/loading-spinner.svg" alt="로딩중" width={200} height={200} />
    </div>
  );
}

export default IsLoading;
