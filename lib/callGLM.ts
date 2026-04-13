import { PromptPayload } from './buildPrompt';

// gemini-2.5-flash-lite: 무료 티어 정상 동작 확인 (2025-04-13)
const GEMINI_MODEL = 'gemini-2.5-flash-lite';
const GEMINI_ENDPOINT = (apiKey: string) =>
  `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:streamGenerateContent?alt=sse&key=${apiKey}`;

/**
 * Gemini API 스트리밍 요청 — ReadableStream 반환
 */
export async function callGLMStream(payload: PromptPayload): Promise<ReadableStream<Uint8Array>> {
  const apiKey = process.env['gemini_api_key'] ?? '';
  if (!apiKey) throw new Error('gemini_api_key 환경변수가 설정되지 않았습니다.');

  const response = await fetch(GEMINI_ENDPOINT(apiKey), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      system_instruction: {
        parts: [{ text: payload.systemPrompt }],
      },
      contents: [
        {
          role: 'user',
          parts: [{ text: payload.userMessage }],
        },
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 8192,
      },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    let userMsg = `Gemini API 오류 (HTTP ${response.status})`;
    try {
      const errJson = JSON.parse(errorText);
      const msg = errJson?.error?.message ?? '';
      const status = errJson?.error?.status ?? '';
      if (status === 'RESOURCE_EXHAUSTED') {
        userMsg = 'Gemini API 무료 할당량이 소진되었습니다. Google AI Studio(ai.google.dev)에서 결제 수단을 추가하거나 새 API 키를 발급해주세요.';
      } else if (status === 'INVALID_ARGUMENT') {
        userMsg = `Gemini API 요청 오류: ${msg}`;
      } else if (msg) {
        userMsg = `Gemini API 오류: ${msg}`;
      }
    } catch {}
    throw new Error(userMsg);
  }

  if (!response.body) throw new Error('Gemini API 응답 body가 없습니다.');

  return response.body;
}

/**
 * Gemini SSE 스트림 파서
 * 형식: "data: {...}\n\n" — candidates[0].content.parts[0].text 추출
 */
export function createSSEParser(): TransformStream<Uint8Array, string> {
  const decoder = new TextDecoder();
  let buffer = '';

  return new TransformStream<Uint8Array, string>({
    transform(chunk, controller) {
      buffer += decoder.decode(chunk, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() ?? '';

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed.startsWith('data:')) continue;

        const data = trimmed.slice(5).trim();
        if (data === '[DONE]') continue;

        try {
          const parsed = JSON.parse(data);
          // Gemini 응답 구조: candidates[0].content.parts[0].text
          const text: string =
            parsed?.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
          if (text) controller.enqueue(text);
        } catch {
          // JSON 파싱 실패 무시
        }
      }
    },
    flush(controller) {
      if (buffer.trim().startsWith('data:')) {
        const data = buffer.trim().slice(5).trim();
        if (data && data !== '[DONE]') {
          try {
            const parsed = JSON.parse(data);
            const text: string =
              parsed?.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
            if (text) controller.enqueue(text);
          } catch {}
        }
      }
    },
  });
}
