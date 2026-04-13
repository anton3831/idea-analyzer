'use client';

import type { Verdict } from '@/lib/parseReport';

interface Props {
  verdict: Verdict;
  summary?: string;
}

const VERDICT_CONFIG = {
  GO: {
    label: '✅ GO — 진행',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/40',
    text: 'text-emerald-400',
    glow: 'shadow-[0_0_24px_rgba(16,185,129,0.25)]',
    badge: 'bg-emerald-500 text-white',
    desc: '강력한 아이디어입니다. 개발을 시작하세요.',
  },
  CONDITIONAL: {
    label: '⚡ 조건부 진행',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/40',
    text: 'text-amber-400',
    glow: 'shadow-[0_0_24px_rgba(245,158,11,0.25)]',
    badge: 'bg-amber-500 text-white',
    desc: '핵심 문제를 먼저 해결한 후 진행하세요.',
  },
  'NO-GO': {
    label: '🚫 NO-GO — 보류',
    bg: 'bg-red-500/10',
    border: 'border-red-500/40',
    text: 'text-red-400',
    glow: 'shadow-[0_0_24px_rgba(239,68,68,0.25)]',
    badge: 'bg-red-500 text-white',
    desc: '현재 형태로는 실현 가능성이 낮습니다.',
  },
};

export default function VerdictBadge({ verdict, summary }: Props) {
  if (!verdict) return null;

  const config = VERDICT_CONFIG[verdict];

  return (
    <div
      className={`
        rounded-xl border p-5
        ${config.bg} ${config.border} ${config.glow}
        animate-fade-in
      `}
    >
      <div className='flex items-start gap-4'>
        <div className='flex-1'>
          <div className='flex items-center gap-3 mb-2'>
            <span className={`text-xs font-bold uppercase tracking-widest ${config.text}`}>
              최종 판정
            </span>
          </div>
          <div className={`text-xl font-black tracking-tight ${config.text} mb-1`}>
            {config.label}
          </div>
          {summary ? (
            <p className='text-sm text-slate-400 leading-relaxed mt-2'>
              {summary}
            </p>
          ) : (
            <p className='text-sm text-slate-500'>{config.desc}</p>
          )}
        </div>
        {/* 판정 강조 뱃지 */}
        <div
          className={`
            shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider
            ${config.badge}
          `}
        >
          {verdict}
        </div>
      </div>
    </div>
  );
}
