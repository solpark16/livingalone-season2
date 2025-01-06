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

    const messageSubscription = channel.on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "chat",
        filter: `post_id=eq.${postId}`,
      },
      async (payload: any) => {
        console.log("Received payload:", payload); // 여기 추가
        console.log("Payload new data:", payload.new); // 상세 데이터 확
        const { data: newMessage } = await supabase
          .from("chat")
          .select("*, profiles!inner(user_id, nickname, profile_image_url)")
          .eq("id", payload.new.id)
          .single();

        if (newMessage) {
          setMessages((currentMessages) => [...currentMessages, newMessage]);
        }
      }
    );
    channel.subscribe(async (status) => {
      console.log("Channel status:", status); // 추가
      if (status === "SUBSCRIBED") {
        console.log("Subscribed to chat channel:", postId);
        const status = await channel.track({
          online_at: new Date().toISOString(),
        });
        console.log("Presence status:", status);
      } else {
        console.log("Failed to subscribe:", status); // 추가
      }
    });
    return () => {
      channel.unsubscribe();
      supabase.removeChannel(messageSubscription);
    };
  }, [postId]);

  return { messages, setMessages };
}
