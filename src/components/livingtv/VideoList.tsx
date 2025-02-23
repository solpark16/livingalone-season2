"use client";
import { useYoutubeData } from "@/hooks/livingtv/useYoutubeData";
import IsLoading from "../common/loading/IsLoading";
import Error from "../common/error/Error";
import Image from "next/image";
import { useMemo } from "react";

function VideoList() {
  const { videoData, isLoading, isError, mainPlayListId } = useYoutubeData();
  const filteredPlayList = useMemo(
    () =>
      videoData.filter((playlist) => playlist.playlistId !== mainPlayListId),
    [videoData, mainPlayListId]
  );

  if (isLoading) return <IsLoading />;
  if (isError) return <Error />;
  return (
    <div className="flex flex-col gap-[100px] mt-[50px] md:mt-[80px] text-[26px] font-bold text-gray-6">
      {filteredPlayList.map((playlist) => (
        <div key={playlist.playlistId}>
          <div className="flex flex-wrap flex-row gap-1 mb-5 text-[18px] md:text-[22px]">
            <h3>{playlist.playlistTitle}</h3>
            <span>|</span>
            <span>{playlist.playlistDescription}</span>
          </div>
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-[10px] md:gap-[13px] justify-center">
            {playlist.videos.map((video) => (
              <li key={video.videoId}>
                <a href={video.videoUrl} target="_blank">
                  <Image
                    src={video.thumbnail}
                    width={290}
                    height={162}
                    alt="영상 썸네일"
                    className="rounded-lg"
                    priority
                  />

                  <span className="mt-5 text-[14px] md:text-lg line-clamp-2">
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
