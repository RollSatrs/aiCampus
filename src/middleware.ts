import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
    const SECRET = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET!);
    const token = req.cookies.get('accessToken')?.value
    const url = req.nextUrl.clone()

    if (url.pathname.startsWith('/auth/login') && token) {
        try {
            const { payload }: any = await jwtVerify(token, SECRET)
            const userId = String(payload.sub)
            return NextResponse.redirect(new URL(`/profile/${userId}`, req.url))
        } catch (err) {
            console.log("⚠️ Ошибка токена:", err)
            const response = NextResponse.redirect(new URL("/auth/login", req.url));
            response.cookies.delete('accessToken')
            return response
        }
    }

    if (url.pathname.startsWith("/profile") && !token) {
        console.log("🚫 Нет токена, редирект на логин");
        return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    if (url.pathname.startsWith('/profile/') && token) {
        try {
            const { payload }: any = await jwtVerify(token, SECRET)
            const userId = String(payload.sub)
            console.log('Это из мидлвара', payload.sub)
            const userIdFromUrl = url.pathname.split('/')[2]
            console.log(userIdFromUrl)
            if (userId !== userIdFromUrl) {
                console.log("⚠️ Чужой профиль — редирект к своему", typeof (payload.sub));
                const response = NextResponse.redirect(new URL(`/profile/${userId}`, req.url));
                return response
            }
        } catch {
            console.log("🚫 Нет токена, редирект на логин");
            const response = NextResponse.redirect(new URL("/auth/login", req.url));
            response.cookies.delete('accessToken')
            return response
        }
    }
    console.log("🟢 Пропускаем дальше")
    return NextResponse.next()
}
export const config = {
    matcher: ["/auth/login", "/profile:path*"],
};