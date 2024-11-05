import { GROUP_ITEM_PER_PAGE } from "@/constants/post";
import { createClient } from "@/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  //리스트
  const url = new URL(request.url);
  const isFinished = url.searchParams.get("isFinished") === "true";
  const page = parseInt(url.searchParams.get("page") || "0");

  const offset = page * GROUP_ITEM_PER_PAGE;

  try {
    const supabase = createClient();
    const { data, count } = await supabase
      .from("group_posts")
      .select(
        "id, title, is_finished, price, people_num , img_url, start_date, item, is_free, end_date, regular_price, group_applications(id)",
        {
          count: "exact",
        }
      )
      .eq("is_finished", isFinished)
      .order("created_at", { ascending: false })
      .range(offset, offset + GROUP_ITEM_PER_PAGE - 1);
    return NextResponse.json({ data, count });
  } catch (error) {
    return NextResponse.json({ error: "데이터를 가져오는 데 실패했습니다." });
  }
}

export async function POST(request: NextRequest) {
  // 공구템 작성
  const newGroupPost = await request.json();
  try {
    const supabase = createClient();
    const { data } = await supabase.from("group_posts").insert(newGroupPost);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "데이터를 등록하는 데 실패했습니다." });
  }
}
