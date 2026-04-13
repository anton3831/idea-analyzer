'use client';

import { useState, useCallback } from 'react';
import IdeaInput from '@/components/IdeaInput';
import AnalysisReport from '@/components/AnalysisReport';

type AppState = 'input' | 'analyzing' | 'result';

export default function HomePage() {
  const [state, setState] = useState<AppState>('input');
  const [markdown, setMarkdown] = useState('');
  const [error, setError] = useState('');

  /**
   * 분석 시작: SSE 스트림으로 마크다운 수신
   */
  const handleAnalyze = useCallback(async (idea: string) => {
    setState('analyzing');
    setMarkdown('');
    setError('');

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idea }),
      });

      // JSON 에러 응답 처리
      if (!response.ok) {
        let msg = `HTTP ${response.status}`;
        try {
          const data = await response.json();
          msg = data.error ?? msg;
        } catch {}
        throw new Error(msg);
      }

      // SSE 스트림 읽기
      const reader = response.body?.getReader();
      if (!reader) throw new Error('응답 스트림을 읽을 수 없습니다.');

      const decoder = new TextDecoder();
      let buffer = '';
      let accumulated = '';

      // 결과 페이지로 먼저 전환 (스트리밍 표시)
      setState('result');

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() ?? '';

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith('data:')) continue;

          const data = trimmed.slice(5).trim();
          if (data === '[DONE]') continue;

          try {
            const parsed = JSON.parse(data);
            if (parsed.error) throw new Error(parsed.error);
            if (parsed.text) {
              accumulated += parsed.text;
              setMarkdown(accumulated);
            }
          } catch (parseErr) {
            if (parseErr instanceof Error && parseErr.message !== 'Unexpected end of JSON input') {
              throw parseErr;
            }
          }
        }
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : '분석 중 알 수 없는 오류가 발생했습니다.';
      setError(message);
      setState('input');
    }
  }, []);

  /** 초기화 */
  const handleReset = useCallback(() => {
    setState('input');
    setMarkdown('');
    setError('');
  }, []);

  // 입력 화면
  if (state === 'input' || state === 'analyzing') {
    return (
      <>
        {error && (
          <div className='fixed top-4 left-1/2 -translate-x-1/2 z-50 max-w-md w-full px-4'>
            <div className='bg-red-500/10 border border-red-500/40 rounded-xl px-4 py-3 flex items-start gap-3'>
              <svg className='w-4 h-4 text-red-400 mt-0.5 shrink-0' fill='currentColor' viewBox='0 0 20 20'>
                <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z' clipRule='evenodd' />
              </svg>
              <div>
                <p className='text-sm font-semibold text-red-300'>분석 실패</p>
                <p className='text-xs text-red-400 mt-0.5'>{error}</p>
              </div>
              <button
                onClick={() => setError('')}
                className='ml-auto text-red-500 hover:text-red-300 transition-colors'
              >
                <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
                  <path fillRule='evenodd' d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z' clipRule='evenodd' />
                </svg>
              </button>
            </div>
          </div>
        )}
        <IdeaInput onSubmit={handleAnalyze} isLoading={state === 'analyzing'} />
      </>
    );
  }

  // 결과 화면
  return (
    <AnalysisReport
      markdown={markdown}
      isStreaming={!markdown.includes('Final Verdict') && markdown.length < 3000}
      onReset={handleReset}
    />
  );
}
