import { createClient } from "@/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;
  const supabase = createClient();
  const { data, error } = await supabase
    .from("group_posts")
    .select(
      "id, title, is_finished, price, people_num , img_url, start_date, end_date, is_free, regular_price, item, group_applications(id, user_name, user_phone, user_address, is_paid)"
    )
    .eq("user_id", userId);

  if (error) {
    return NextResponse.json({ error: error.message });
  }
  return NextResponse.json(data);
}
