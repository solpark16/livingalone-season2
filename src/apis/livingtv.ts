export async function getPlayList() {
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId=${process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID}&maxResults=50&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`
  );
  const data = await response.json();
  return data.items;
}

export async function getVideos(playlistId: string) {
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=50&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`
  );
  const data = await response.json();
  return data.items;
}
