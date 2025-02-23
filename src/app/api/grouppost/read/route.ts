import { createClient } from "@/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const supabase = createClient();
    const { data } = await supabase
      .from("group_posts")
      .select(
        `id, title, is_finished, price, people_num , regular_price, img_url, start_date, end_date, group_applications(id), group_likes(id)`
      )
      .eq("is_finished", false);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "데이터를 가져오는 데 실패했습니다." });
  }
}
