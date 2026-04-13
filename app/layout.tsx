import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import Header from '@/components/Header';
import './globals.css';

export const metadata: Metadata = {
  title: '아이디어렌즈 — 사업 아이디어 분석기',
  description: 'AI가 당신의 사업 아이디어를 냉정하게 분석합니다. 시장 규모, 비즈니스 모델, 리스크, GO/NO-GO 판정을 즉시 확인하세요.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider appearance={{ cssLayerName: 'clerk' }}>
      <html lang='ko'>
        <head>
          <link rel='preconnect' href='https://fonts.googleapis.com' />
          <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous' />
        </head>
        <body className='min-h-screen bg-[#08090f] text-slate-200 antialiased'>
          <Header />
          <main className='pt-14'>
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
