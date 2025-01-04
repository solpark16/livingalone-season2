import { createClient } from "@/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const alarm = await request.json();
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("alarms")
      .insert(alarm)
      .select("*");
    if (error) throw error;
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
