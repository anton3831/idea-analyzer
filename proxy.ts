import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// 공개 경로 정의 (인증 불필요)
const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)',
  '/sign-up(.*)',
]);

export default clerkMiddleware(async (auth, request) => {
  // 공개 경로가 아니면 인증 강제
  if (!isPublicRoute(request)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Next.js 내부 파일 및 정적 파일 제외
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // API 라우트 항상 포함
    '/(api|trpc)(.*)',
  ],
};
