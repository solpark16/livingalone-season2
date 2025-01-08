import { createClient } from "@/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const supabase = createClient();
    const { data } = await supabase
      .from("group_posts")
      .select(
        "id, title, is_finished, price, people_num, content, img_url, start_date, item, is_free, end_date, regular_price, group_applications(id)"
      )
      .order("created_at", { ascending: false });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "데이터를 가져오는 데 실패했습니다." });
  }
}
