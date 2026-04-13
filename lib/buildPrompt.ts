import { GuideContent } from './loadGuide';

export interface PromptPayload {
  systemPrompt: string;
  userMessage: string;
}

/**
 * 가이드 컨텍스트 + 사용자 아이디어를 하나의 프롬프트로 조합
 */
export function buildPrompt(
  guide: GuideContent,
  userIdea: string
): PromptPayload {
  const userMessage = `
Below is your detailed analysis framework. Study it carefully before analyzing.

${guide.guideContext}

---

## 분석할 사업 아이디어

${userIdea.trim()}

---

위 프레임워크에 따라 완전한 분석을 수행하세요.

**중요: 모든 출력은 반드시 한국어로 작성하세요.**
마크다운 형식으로 출력하며, 다음으로 시작하세요: # 🚀 사업 아이디어 분석 보고서
`.trim();

  return {
    systemPrompt: guide.systemPrompt,
    userMessage,
  };
}
