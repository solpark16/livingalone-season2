"use client";
import { useYoutubeData } from "@/hooks/livingtv/useYoutubeData";
import Image from "next/image";
import Error from "@/components/common/error/Error";
import IsLoading from "@/components/common/loading/IsLoading";
import MainSectionTitle from "../common/MainSectionTitle";
import Button from "@/components/common/button/Button";

function LivingTVSection() {
  const { videoData, isLoading, isError, mainPlayListId } = useYoutubeData();

  if (isLoading) return <IsLoading />;
  if (isError) return <Error />;

  const mainPlayList = videoData.find(
    (playlist) => playlist.playlistId === mainPlayListId
  );

  const mainVideoList = mainPlayList?.videos;

  return (
    <div className="container mx-auto w-full max-w-[1200px] px-[12px] xl:px-0">
      <MainSectionTitle
        title="자취 티비"
        content="자취에 유용한 정보와 다양한 영상을 확인해보세요."
        link="/livingtv"
      />
      <ul className="grid grid-cols-1 gap-y-5 md:grid-cols-4 md:gap-[13px] text-gray-6 text-[14px] md:text-xl font-bold">
        {mainVideoList?.map((video) => (
          <li key={video.videoId}>
            <a href={video.videoUrl} target="_blank">
              <Image
                src={video.thumbnail}
                width={290}
                height={162}
                alt="영상 썸네일"
                className="rounded-lg w-full"
              />
              <span className="mt-5 text-base md:text-xl line-clamp-2">
                {video.title}
              </span>
            </a>
          </li>
        ))}
      </ul>
      <div className="mt-[30px] text-center md:hidden">
        <Button
          bgColor="bg-main-2"
          textColor="text-main-7"
          href="/livingtv"
          content="더 많은 게시물 보기"
        />
      </div>
    </div>
  );
}

export default LivingTVSection;
