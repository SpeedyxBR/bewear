import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin")) {
    // Verificar se há token de sessão
    const sessionToken = request.cookies.get(
      "better-auth.session_token",
    )?.value;

    if (!sessionToken) {
      return NextResponse.redirect(new URL("/authentication", request.url));
    }

    // Para o Edge Runtime, vamos confiar na verificação do layout do admin
    // que tem acesso completo ao banco de dados
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
