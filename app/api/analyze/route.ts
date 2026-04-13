import { NextRequest } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { loadGuide } from '@/lib/loadGuide';
import { buildPrompt } from '@/lib/buildPrompt';
import { callGLMStream, createSSEParser } from '@/lib/callGLM';

export const runtime = 'nodejs';
export const maxDuration = 120; // 2분

export async function POST(req: NextRequest) {
  // 인증 확인
  const { userId } = await auth();
  if (!userId) {
    return new Response(JSON.stringify({ error: '로그인이 필요합니다.' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // 요청 본문에서 아이디어 추출
  let idea: string;
  try {
    const body = await req.json();
    idea = (body.idea ?? '').trim();
  } catch {
    return new Response(JSON.stringify({ error: '잘못된 요청 형식입니다.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!idea) {
    return new Response(JSON.stringify({ error: '아이디어를 입력해주세요.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (idea.length > 5000) {
    return new Response(JSON.stringify({ error: '아이디어는 5000자 이내로 입력해주세요.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    // 1. 가이드 파일 로드
    const guide = await loadGuide();

    // 2. 프롬프트 구성
    const payload = buildPrompt(guide, idea);

    // 3. GLM API 스트리밍 호출
    const glmStream = await callGLMStream(payload);

    // 4. SSE → 텍스트 청크 파싱 후 클라이언트로 스트리밍
    const encoder = new TextEncoder();
    const sseParser = createSSEParser();

    const outputStream = new ReadableStream<Uint8Array>({
      async start(controller) {
        const reader = glmStream.pipeThrough(sseParser).getReader();
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            // 클라이언트로 전달: "data: {text}\n\n" 형식
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify({ text: value })}\n\n`)
            );
          }
          // 스트림 완료 신호
          controller.enqueue(encoder.encode('data: [DONE]\n\n'));
        } catch (err) {
          const msg = err instanceof Error ? err.message : '스트리밍 오류';
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ error: msg })}\n\n`)
          );
        } finally {
          controller.close();
        }
      },
    });

    return new Response(outputStream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache, no-transform',
        Connection: 'keep-alive',
        'X-Accel-Buffering': 'no',
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : '분석 중 오류가 발생했습니다.';
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
