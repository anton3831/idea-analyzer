'use client';

import { useState, useRef } from 'react';

interface Props {
  onSubmit: (idea: string) => void;
  isLoading: boolean;
}

const EXAMPLE_IDEAS = [
  '이메일을 읽고 내 글쓰기 스타일로 자동 답장 초안을 작성해주는 AI 도구',
  '반경 100km 이내 농장에서 생산한 로컬 장인 식품을 월정액으로 배송하는 구독 박스',
  '개발자가 자신의 로컬 GPU 컴퓨팅 자원을 AI 연구자에게 빌려주는 P2P 플랫폼',
  '노인 환자의 복약 순응도를 게임화하여 알림과 보상으로 관리하는 모바일 앱',
];

export default function IdeaInput({ onSubmit, isLoading }: Props) {
  const [idea, setIdea] = useState('');
  const [focused, setFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = idea.trim();
    if (!trimmed || isLoading) return;
    onSubmit(trimmed);
  };

  const handleExample = (text: string) => {
    setIdea(text);
    textareaRef.current?.focus();
  };

  const charCount = idea.length;
  const isOverLimit = charCount > 5000;
  const canSubmit = idea.trim().length >= 10 && !isOverLimit && !isLoading;

  return (
    <div className='min-h-screen bg-[#08090f] bg-grid flex flex-col'>
      {/* 배경 글로우 오브 */}
      <div
        className='pointer-events-none fixed top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full'
        style={{
          background:
            'radial-gradient(ellipse, rgba(79,110,247,0.12) 0%, transparent 70%)',
        }}
      />

      {/* 헤더 */}
      <header className='relative z-10 px-6 py-5'>
        <div className='max-w-6xl mx-auto flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <div className='w-7 h-7 rounded-lg bg-[#4f6ef7] flex items-center justify-center shadow-[0_0_16px_rgba(79,110,247,0.5)]'>
              <svg className='w-4 h-4 text-white' fill='currentColor' viewBox='0 0 20 20'>
                <path d='M10 12a2 2 0 100-4 2 2 0 000 4z' />
                <path fillRule='evenodd' d='M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z' clipRule='evenodd' />
              </svg>
            </div>
            <span className='text-base font-bold text-white tracking-tight'>아이디어렌즈</span>
          </div>
          <span className='text-xs text-slate-600 border border-white/8 px-3 py-1.5 rounded-full'>
            Powered by Gemini 2.5 Flash
          </span>
        </div>
      </header>

      {/* 히어로 + 입력 영역 */}
      <main className='relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-12'>
        <div className='w-full max-w-2xl'>

          {/* 타이틀 */}
          <div className='text-center mb-10'>
            <div className='inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#4f6ef7]/30 bg-[#4f6ef7]/8 text-xs text-[#a5b4fc] font-medium mb-6'>
              <span className='w-1.5 h-1.5 rounded-full bg-[#4f6ef7] animate-pulse-slow' />
              AI 기반 사업 아이디어 분석
            </div>
            <h1 className='text-4xl sm:text-5xl font-black text-white leading-[1.1] tracking-tight mb-4'>
              당신의 아이디어,{' '}
              <span
                className='bg-gradient-to-r from-[#4f6ef7] to-[#a78bfa] bg-clip-text text-transparent'
                style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
              >
                실제로 될까요?
              </span>
            </h1>
            <p className='text-slate-400 text-base leading-relaxed max-w-lg mx-auto'>
              시장 규모, 비즈니스 모델, 리스크를 구조적으로 분석하고{' '}
              <span className='text-slate-300 font-medium'>GO / NO-GO 판정</span>을 내려드립니다.
            </p>
          </div>

          {/* 입력 폼 */}
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div
              className={`
                relative rounded-2xl border transition-all duration-300
                ${focused
                  ? 'border-[#4f6ef7]/60 shadow-[0_0_0_3px_rgba(79,110,247,0.12)]'
                  : 'border-white/10 hover:border-white/20'
                }
                bg-white/[0.03]
              `}
            >
              <textarea
                ref={textareaRef}
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder='사업 아이디어를 자세히 설명해주세요. 어떤 문제를 해결하나요? 타겟 고객은 누구인가요? 기존 서비스와 무엇이 다른가요?'
                rows={7}
                disabled={isLoading}
                className='
                  w-full bg-transparent text-slate-200 placeholder-slate-600
                  text-sm leading-relaxed resize-none
                  px-5 pt-5 pb-14
                  focus:outline-none rounded-2xl
                  disabled:opacity-50 disabled:cursor-not-allowed
                '
              />

              {/* 하단 바: 글자수 + 제출 버튼 */}
              <div className='absolute bottom-0 inset-x-0 flex items-center justify-between px-4 pb-3'>
                <span
                  className={`text-xs tabular-nums transition-colors ${
                    isOverLimit
                      ? 'text-red-400'
                      : charCount > 4000
                      ? 'text-amber-500'
                      : 'text-slate-600'
                  }`}
                >
                  {charCount.toLocaleString()} / 5,000자
                </span>

                <button
                  type='submit'
                  disabled={!canSubmit}
                  className='
                    flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold
                    bg-[#4f6ef7] text-white
                    hover:bg-[#3d5ce8]
                    disabled:opacity-40 disabled:cursor-not-allowed
                    transition-all duration-200
                    shadow-[0_0_20px_rgba(79,110,247,0.4)]
                    hover:shadow-[0_0_28px_rgba(79,110,247,0.6)]
                    active:scale-95
                  '
                >
                  {isLoading ? (
                    <>
                      <svg className='w-4 h-4 animate-spin' fill='none' viewBox='0 0 24 24'>
                        <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
                        <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z' />
                      </svg>
                      분석 중…
                    </>
                  ) : (
                    <>
                      분석하기
                      <svg className='w-4 h-4' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2.5}>
                        <path strokeLinecap='round' strokeLinejoin='round' d='M13 7l5 5m0 0l-5 5m5-5H6' />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </div>

            {isOverLimit && (
              <p className='text-xs text-red-400 pl-1'>
                아이디어는 5,000자 이내로 입력해주세요.
              </p>
            )}
          </form>

          {/* 예시 아이디어 */}
          <div className='mt-8'>
            <p className='text-xs text-slate-600 mb-3 font-medium uppercase tracking-wider'>
              예시 아이디어
            </p>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
              {EXAMPLE_IDEAS.map((example, i) => (
                <button
                  key={i}
                  onClick={() => handleExample(example)}
                  disabled={isLoading}
                  className='
                    text-left text-xs text-slate-500 leading-relaxed
                    px-3.5 py-2.5 rounded-xl
                    border border-white/6 bg-white/[0.02]
                    hover:border-white/12 hover:bg-white/[0.04] hover:text-slate-400
                    transition-all duration-200
                    disabled:opacity-40 disabled:cursor-not-allowed
                    line-clamp-2
                  '
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* 푸터 */}
      <footer className='relative z-10 text-center py-6 text-xs text-slate-700'>
        냉정하고 구조적인 분석. 과장 없음. 허풍 없음.
      </footer>
    </div>
  );
}
