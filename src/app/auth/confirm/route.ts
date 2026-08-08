import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const tokenHash = request.nextUrl.searchParams.get("token_hash");
  const destination = new URL("/redefinir-senha", request.url);

  if (tokenHash) {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.verifyOtp({
      token_hash: tokenHash,
      type: "recovery",
    });
    if (!error) return NextResponse.redirect(destination);
  }

  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("recoveryError", "1");
  return NextResponse.redirect(loginUrl);
}
