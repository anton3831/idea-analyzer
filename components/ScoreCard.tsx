'use client';

import type { ScoreItem } from '@/lib/parseReport';

interface Props {
  scores: ScoreItem[];
}

// 영문 레이블 → 한국어 변환
const LABEL_KO: Record<string, string> = {
  Viability: '실현 가능성',
  Profitability: '수익성',
  Scalability: '확장성',
};

function ScoreBar({ value }: { value: number }) {
  const percentage = (value / 10) * 100;
  const color =
    value >= 7
      ? 'from-emerald-500 to-emerald-400'
      : value >= 5
      ? 'from-amber-500 to-amber-400'
      : 'from-red-500 to-red-400';

  return (
    <div className='w-full'>
      <div className='h-1.5 bg-white/5 rounded-full overflow-hidden'>
        <div
          className={`h-full rounded-full bg-gradient-to-r ${color} transition-all duration-700`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export default function ScoreCard({ scores }: Props) {
  const validScores = scores.filter((s) => s.value > 0);
  if (validScores.length === 0) return null;

  return (
    <div className='rounded-xl border border-white/8 bg-white/[0.03] p-5 animate-fade-in'>
      <h3 className='text-xs font-bold uppercase tracking-widest text-slate-500 mb-4'>
        평가 점수
      </h3>
      <div className='space-y-4'>
        {validScores.map((score) => (
          <div key={score.label}>
            <div className='flex items-baseline justify-between mb-1.5'>
              <span className='text-sm font-semibold text-slate-300'>
                {LABEL_KO[score.label] ?? score.label}
              </span>
              <span
                className={`text-lg font-black tabular-nums ${
                  score.value >= 7
                    ? 'text-emerald-400'
                    : score.value >= 5
                    ? 'text-amber-400'
                    : 'text-red-400'
                }`}
              >
                {score.value}
                <span className='text-xs text-slate-600 font-normal'>/10</span>
              </span>
            </div>
            <ScoreBar value={score.value} />
            {score.justification && (
              <p className='text-xs text-slate-500 mt-1.5 leading-relaxed'>
                {score.justification}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
