"use client";
import { useYoutubeData } from "@/hooks/livingtv/useYoutubeData";
import IsLoading from "../common/loading/IsLoading";
import Error from "../common/error/Error";
import Link from "next/link";
import Image from "next/image";

function VideoList() {
  const { videoData, isLoading, isError } = useYoutubeData();

  if (isLoading) return <IsLoading />;
  if (isError) return <Error />;

  return (
    <div className="flex flex-col items-center text-[26px] font-bold text-gray-6 ">
      <h2>자취 티비</h2>
      <div className="flex flex-col gap-[100px]">
        {videoData.map((playlist) => (
          <div key={playlist.playlistId}>
            <div className="flex flex-row gap-1 mb-5 text-[22px]">
              <h3>{playlist.playlistTitle}</h3>
              <span>|</span>
              <span>#어쩌고 #저쩌고</span>
            </div>
            <ul className="grid grid-cols-4 gap-[13px]">
              {playlist.videos.map((video) => (
                <li key={video.videoId}>
                  <a href={video.videoUrl} target="_blank">
                    <Image
                      src={video.thumbnail}
                      width={290}
                      height={162}
                      alt="영상 썸네일"
                      className="rounded-lg"
                    />
                    <span className="mt-5 text-xl line-clamp-2">
                      {video.title}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VideoList;
