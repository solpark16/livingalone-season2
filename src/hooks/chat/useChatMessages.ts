import { getMyProfile } from "@/apis/mypage";
import { createClient } from "@/supabase/client";
import { TChat } from "@/types/types";
import { useEffect, useMemo, useState } from "react";

export const useChatMessages = (postId: string) => {
  const supabase = useMemo(() => createClient(), []);
  const [messages, setMessages] = useState<TChat[]>([]);

  const fetchInitialMessages = async () => {
    const { data } = await supabase
      .from("chat")
      .select("*, profiles!inner( user_id , nickname, profile_image_url)")
      .eq("post_id", postId)
      .order("created_at", { ascending: true });

    console.log(data);

    if (data) {
      setMessages(data);
    }
  };
  useEffect(() => {
    fetchInitialMessages();

    const messageSubscription = supabase
      .channel("chat1")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "chat",
          filter: `post_id=eq.${postId}`,
        },
        async (payload: any) => {
          const profile = await getMyProfile(payload.new.user_id);
          setMessages((currentMessages) => [
            ...currentMessages,
            {
              ...payload.new,
              profiles: {
                nickname: profile.nickname,
                profile_image_url: profile.profile_image_url,
                user_id: profile.user_id,
              },
            },
          ]);
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(messageSubscription);
    };
  }, []);

  return { messages };
};
