'use client';

import { useState } from 'react';

interface Props {
  markdown: string;
  onReset: () => void;
}

export default function ActionButtons({ markdown, onReset }: Props) {
  const [copied, setCopied] = useState(false);

  // 마크다운을 클립보드에 복사
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const el = document.createElement('textarea');
      el.value = markdown;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // 브라우저 인쇄 다이얼로그 → PDF 저장
  const handlePDF = () => {
    window.print();
  };

  return (
    <div className='flex items-center gap-2 flex-wrap no-print'>
      {/* 새 분석 버튼 */}
      <button
        onClick={onReset}
        className='
          flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
          bg-white/5 border border-white/10 text-slate-300
          hover:bg-white/10 hover:border-white/20 hover:text-white
          transition-all duration-200
        '
      >
        <svg className='w-4 h-4' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
          <path strokeLinecap='round' strokeLinejoin='round' d='M12 4v16m8-8H4' />
        </svg>
        새 분석
      </button>

      {/* 마크다운 복사 */}
      <button
        onClick={handleCopy}
        className='
          flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
          bg-white/5 border border-white/10 text-slate-300
          hover:bg-white/10 hover:border-white/20 hover:text-white
          transition-all duration-200
        '
      >
        {copied ? (
          <>
            <svg className='w-4 h-4 text-emerald-400' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
              <path strokeLinecap='round' strokeLinejoin='round' d='M5 13l4 4L19 7' />
            </svg>
            <span className='text-emerald-400'>복사 완료!</span>
          </>
        ) : (
          <>
            <svg className='w-4 h-4' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
              <path strokeLinecap='round' strokeLinejoin='round' d='M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z' />
            </svg>
            마크다운 복사
          </>
        )}
      </button>

      {/* PDF 다운로드 */}
      <button
        onClick={handlePDF}
        className='
          flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
          bg-[#4f6ef7]/10 border border-[#4f6ef7]/30 text-[#a5b4fc]
          hover:bg-[#4f6ef7]/20 hover:border-[#4f6ef7]/50 hover:text-white
          transition-all duration-200
        '
      >
        <svg className='w-4 h-4' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
          <path strokeLinecap='round' strokeLinejoin='round' d='M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' />
        </svg>
        PDF 저장
      </button>
    </div>
  );
}
