import { createClient } from "@/supabase/client";
import { TChat } from "@/types/types";
import { useEffect, useState } from "react";

export function useChatMessages(postId: string) {
  const [messages, setMessages] = useState<TChat[]>([]);
  const supabase = createClient();
  const fetchInitialMessages = async () => {
    const { data } = await supabase
      .from("chat")
      .select("*, profiles!inner( user_id , nickname, profile_image_url)")
      .eq("post_id", postId)
      .order("created_at", { ascending: true });

    if (data) {
      setMessages(data);
    }
  };
  useEffect(() => {
    fetchInitialMessages();
    const channel = supabase.channel(`chat_${postId}`); // 고유한 채널명 사용

    const messageSubscription = channel
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "chat",
          filter: `post_id=eq.${postId}`,
        },
        async (payload: any) => {
          const { data: newMessage } = await supabase
            .from("chat")
            .select("*, profiles!inner(user_id, nickname, profile_image_url)")
            .eq("id", payload.new.id)
            .single();

          if (newMessage) {
            setMessages((currentMessages) => [...currentMessages, newMessage]);
          }
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(messageSubscription);
    };
  }, [postId]);

  return { messages, setMessages };
}
