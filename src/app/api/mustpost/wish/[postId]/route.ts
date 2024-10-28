import { createClient } from "@/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { postId: string } }) {
  const { postId } = params;

  const supabase = createClient();
  try {
    const { data } = await supabase.from("must_wishes").select("*").eq("post_id", postId);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "좋아요를 가져오는 데 실패했습니다." });
  }
}
