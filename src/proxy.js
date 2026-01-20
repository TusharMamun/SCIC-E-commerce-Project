import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
const secret = process.env.NEXTAUTH_SECRET
const privateRoutes = ["/shop", "/blog", "/contact", "/private"]

export async function proxy(req) {
  const token = await getToken({ req, secret })
  const reqPath = req.nextUrl.pathname
  const isAuthenticated = Boolean(token)
  const isUser = token?.role === "user"
  

  const isPrivateRoute = privateRoutes.some((route) => reqPath.startsWith(route))
  if(!isAuthenticated && isPrivateRoute){

    const logingUrl =new URL("/api/auth/signin?",req.url)
    logingUrl.searchParams.set("callbackUrl",reqPath);
    return NextResponse.redirect(logingUrl )
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/contact/:path*','/shop/:path*','/blog/:path*']
}