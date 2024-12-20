"use client";
import { useYoutubeData } from "@/hooks/livingtv/useYoutubeData";
import IsLoading from "../common/loading/IsLoading";
import Error from "../common/error/Error";
import Link from "next/link";
import Image from "next/image";

function VideoList() {
  const { videoData, isLoading, isError, mainPlayListId } = useYoutubeData();
  const filteredPlayList = videoData.filter(
    (playlist) => playlist.playlistId !== mainPlayListId
  );

  if (isLoading) return <IsLoading />;
  if (isError) return <Error />;

  return (
    <div className="flex flex-col gap-[100px] mt-[50px] md:mt-[80px] text-[26px] font-bold text-gray-6">
      {filteredPlayList.map((playlist) => (
        <div key={playlist.playlistId}>
          <div className="flex flex-row gap-1 mb-5 text-xl md:text-[22px]">
            <h3>{playlist.playlistTitle}</h3>
            <span>|</span>
            <span>#어쩌고 #저쩌고</span>
          </div>
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-[10px] md:gap-[13px] justify-center">
            {playlist.videos.map((video) => (
              <li key={video.videoId} className="w-[290px]">
                <a href={video.videoUrl} target="_blank">
                  <Image
                    src={video.thumbnail}
                    width={290}
                    height={162}
                    alt="영상 썸네일"
                    className="rounded-lg"
                  />

                  <span className="mt-5 text-base md:text-xl line-clamp-2">
                    {video.title}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default VideoList;
