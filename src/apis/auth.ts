import { createClient } from "@/supabase/client";

export async function getUser() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  if (data.user) {
    const userId = data.user.id as string;
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (profile) return { data, error: profileError };

    const noProfile = profileError?.code === "PGRST116";

    if (noProfile) {
      console.log("야임마");
      // 👆🏻 이것 뭐예요? ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ
      await supabase
        .from("profiles")
        .insert([{ user_id: userId, nickname: "혼살러" }]);
    }
  }

  return { data, error };
}

export async function join(joinData: {
  email: string;
  password: string;
  nickname: string;
}) {
  const response = await fetch("/api/auth/join", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(joinData),
  });
  const data = await response.json();
  return data;
}

export async function login(loginData: { email: string; password: string }) {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(loginData),
  });
  const data = await response.json();
  return data;
}

export async function googleLogin() {
  const supabase = createClient();
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: process.env.NEXT_PUBLIC_SITE_URL,
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });

  if (error) return { error: "구글 로그인 실패" };

  return { error };
}

export async function kakaoLogin() {
  const supabase = createClient();
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "kakao",
    options: {
      redirectTo: process.env.NEXT_PUBLIC_SITE_URL,
    },
  });

  if (error) return { error: "카카오 로그인 실패" };

  return { error };
}
