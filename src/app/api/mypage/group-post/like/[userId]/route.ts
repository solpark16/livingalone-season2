import { createClient } from "@/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;
  const supabase = createClient();
  const { data, error } = await supabase
    .from("group_likes")
    .select(
      "id,post_id, group_posts(title,item,regular_price,price,people_num,start_date,is_finished,is_free,img_url,group_applications(id))"
    )
    .eq("user_id", userId);

  if (error) {
    return NextResponse.json({ error: error.message });
  }
  return NextResponse.json(data);
}
