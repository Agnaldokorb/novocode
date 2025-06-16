import { NextResponse } from "next/server";

export function middleware() {
  console.log("� MIDDLEWARE SIMPLES EXECUTANDO!!!");
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin"],
};
