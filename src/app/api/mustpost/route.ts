import { MUST_ITEM_PER_PAGE } from "@/constants/post";
import { createClient } from "@/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "0");
  const offset = page * MUST_ITEM_PER_PAGE;

  try {
    const supabase = createClient();
    const { data, count } = await supabase
      .from("must_posts")
      .select("id, title, content, item, img_url, category_id", {
        count: "exact",
      })
      .order("created_at", { ascending: false })
      .range(offset, offset + MUST_ITEM_PER_PAGE - 1);

    return NextResponse.json({ data, count });
  } catch (error) {
    return NextResponse.json({ error: "데이터를 가져오는 데 실패했습니다." });
  }
}

export async function POST(request: NextRequest) {
  const newMustPost = await request.json();
  try {
    const supabase = createClient();
    const { data } = await supabase.from("must_posts").insert(newMustPost);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "데이터를 등록하는 데 실패했습니다." });
  }
}
