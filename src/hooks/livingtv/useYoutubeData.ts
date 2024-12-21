import { getPlayList, getVideos } from "@/apis/livingtv";
import { TPlayList, TVideoList, TVideo } from "@/types/types";
import { useQuery } from "@tanstack/react-query";

export function useYoutubeData() {
  const mainPlayListId = "PLIEC5cdXEn76Rs9XIKYwAzqVeAYdNNFC7";
  const {
    data: videoData = [],
    isLoading,
    isError,
  } = useQuery<TVideo[]>({
    queryKey: ["videoData"],
    queryFn: async () => {
      const playLists: TPlayList[] = await getPlayList();
      console.log(playLists);
      return Promise.all(
        playLists.map(async (playlist) => {
          const videos: TVideoList[] = await getVideos(playlist.id);
          return {
            playlistId: playlist.id,
            playlistTitle: playlist.snippet.title,
            playlistDescription: playlist.snippet.description,
            videos: videos.map((video) => ({
              title: video.snippet.title,
              thumbnail: video.snippet.thumbnails.medium.url,
              videoUrl: `https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}`,
              videoId: video.snippet.resourceId.videoId,
            })),
          };
        })
      );
    },
  });

  return { videoData, isLoading, isError, mainPlayListId };
}
