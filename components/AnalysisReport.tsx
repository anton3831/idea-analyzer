'use client';

import { useMemo } from 'react';
import { marked } from 'marked';
import { parseReport } from '@/lib/parseReport';
import VerdictBadge from './VerdictBadge';
import ScoreCard from './ScoreCard';
import ActionButtons from './ActionButtons';

// marked 설정: GFM + 줄바꿈 허용
marked.setOptions({ breaks: true, gfm: true } as Parameters<typeof marked.setOptions>[0]);

interface Props {
  markdown: string;
  isStreaming: boolean;
  onReset: () => void;
}

/** 스켈레톤 로딩 UI */
function LoadingSkeleton() {
  return (
    <div className='space-y-4 animate-pulse'>
      {[100, 80, 95, 60, 88].map((w, i) => (
        <div key={i} className='skeleton h-4' style={{ width: `${w}%` }} />
      ))}
      <div className='h-6' />
      {[75, 90, 65, 85].map((w, i) => (
        <div key={i} className='skeleton h-4' style={{ width: `${w}%` }} />
      ))}
    </div>
  );
}

/** 스트리밍 중 커서 깜빡이기 */
function StreamingCursor() {
  return (
    <span
      className='inline-block w-0.5 h-4 bg-[#4f6ef7] ml-0.5 align-middle'
      style={{ animation: 'pulse 1s step-start infinite' }}
    />
  );
}

export default function AnalysisReport({ markdown, isStreaming, onReset }: Props) {
  // 마크다운 → HTML 변환
  const html = useMemo(() => {
    if (!markdown) return '';
    return marked.parse(markdown) as string;
  }, [markdown]);

  // 구조화 데이터 파싱 (스트리밍 완료 후에만)
  const parsed = useMemo(() => {
    if (isStreaming || !markdown) return null;
    return parseReport(markdown);
  }, [markdown, isStreaming]);

  return (
    <div className='min-h-screen bg-[#08090f] bg-grid'>
      {/* 상단 네비 */}
      <header className='sticky top-0 z-20 border-b border-white/6 bg-[#08090f]/80 backdrop-blur-xl no-print'>
        <div className='max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between'>
          {/* 로고 */}
          <div className='flex items-center gap-2'>
            <div className='w-6 h-6 rounded-md bg-[#4f6ef7] flex items-center justify-center'>
              <svg className='w-3.5 h-3.5 text-white' fill='currentColor' viewBox='0 0 20 20'>
                <path d='M10 12a2 2 0 100-4 2 2 0 000 4z' />
                <path fillRule='evenodd' d='M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z' clipRule='evenodd' />
              </svg>
            </div>
            <span className='text-sm font-semibold text-white'>아이디어렌즈</span>
          </div>

          {/* 액션 버튼 */}
          {!isStreaming && markdown && (
            <ActionButtons markdown={markdown} onReset={onReset} />
          )}
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className='max-w-6xl mx-auto px-4 sm:px-6 py-8'>
        <div className='flex flex-col lg:flex-row gap-6'>

          {/* ── 왼쪽: 마크다운 리포트 ── */}
          <div className='flex-1 min-w-0'>
            <div className='rounded-2xl border border-white/8 bg-white/[0.025] p-6 sm:p-8'>
              {!markdown && isStreaming ? (
                <LoadingSkeleton />
              ) : (
                <>
                  <div
                    className='report-content'
                    dangerouslySetInnerHTML={{ __html: html }}
                  />
                  {isStreaming && <StreamingCursor />}
                </>
              )}
            </div>
          </div>

          {/* ── 오른쪽: 사이드바 (판정 + 점수) ── */}
          {parsed && (
            <aside className='lg:w-72 xl:w-80 space-y-4 no-print'>
              {/* 판정 카드 */}
              <VerdictBadge
                verdict={parsed.verdict}
                summary={parsed.verdictSummary}
              />

              {/* 점수 카드 */}
              <ScoreCard scores={parsed.scores} />

              {/* 빠른 메모 */}
              <div className='rounded-xl border border-white/8 bg-white/[0.03] p-4'>
                <h3 className='text-xs font-bold uppercase tracking-widest text-slate-500 mb-3'>
                  사용 안내
                </h3>
                <ul className='space-y-2 text-xs text-slate-500'>
                  <li className='flex gap-2'>
                    <span className='text-[#4f6ef7]'>•</span>
                    "마크다운 복사"로 보고서를 저장할 수 있습니다
                  </li>
                  <li className='flex gap-2'>
                    <span className='text-[#4f6ef7]'>•</span>
                    "PDF 저장"은 브라우저 인쇄 다이얼로그를 사용합니다
                  </li>
                  <li className='flex gap-2'>
                    <span className='text-[#4f6ef7]'>•</span>
                    "새 분석"으로 다른 아이디어를 분석하세요
                  </li>
                </ul>
              </div>
            </aside>
          )}
        </div>
      </main>
    </div>
  );
}
