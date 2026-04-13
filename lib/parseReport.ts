/**
 * AI 출력 마크다운에서 구조화된 정보 추출
 */

export type Verdict = 'GO' | 'CONDITIONAL' | 'NO-GO' | null;

export interface ScoreItem {
  label: string;
  value: number;
  justification: string;
}

export interface ParsedReport {
  verdict: Verdict;
  verdictSummary: string;
  scores: ScoreItem[];
}

/**
 * 마크다운 텍스트에서 판정(GO/CONDITIONAL/NO-GO) 추출
 */
function extractVerdict(markdown: string): { verdict: Verdict; summary: string } {
  // Final Verdict 섹션 찾기
  const verdictSection = markdown.match(
    /#{1,3}\s*(?:\d+\.\s*)?(?:Final\s+)?Verdict[\s\S]{0,20}\n([\s\S]*?)(?=\n#{1,3}|$)/i
  );

  const sectionText = verdictSection?.[1] ?? markdown.slice(-800);

  // NO-GO → CONDITIONAL → GO 순서로 검출 (우선순위 역순)
  // 한국어 표현도 함께 지원: 보류/조건부/진행
  if (/\bNO[-\s]GO\b|보류/i.test(sectionText)) {
    const summary = extractVerdictSummary(sectionText, 'NO-GO');
    return { verdict: 'NO-GO', summary };
  }
  if (/\bCONDITIONAL\b|조건부/i.test(sectionText)) {
    const summary = extractVerdictSummary(sectionText, 'CONDITIONAL');
    return { verdict: 'CONDITIONAL', summary };
  }
  if (/\bGO\b|진행/i.test(sectionText)) {
    const summary = extractVerdictSummary(sectionText, 'GO');
    return { verdict: 'GO', summary };
  }

  return { verdict: null, summary: '' };
}

function extractVerdictSummary(text: string, verdictWord: string): string {
  // 판정 단어 뒤의 첫 문장을 한 줄 요약으로 사용
  const re = new RegExp(verdictWord + '[^.\\n]*[—–-]?\\s*([^.\\n]{10,200})', 'i');
  const match = text.match(re);
  if (match?.[1]) return match[1].trim().replace(/\*+/g, '');

  // 대안: 첫 불릿 포인트
  const bullet = text.match(/[*-]\s+(.{10,200})/);
  if (bullet?.[1]) return bullet[1].trim();

  return '';
}

/**
 * 마크다운에서 점수 추출
 * 예: "**Viability**: 7/10 — ..." 또는 "* Viability: 7/10"
 */
function extractScores(markdown: string): ScoreItem[] {
  // 영문 + 한국어 레이블 모두 지원
  const labels = [
    'Viability|실현 가능성|생존 가능성',
    'Profitability|수익성',
    'Scalability|확장성',
  ];
  const scores: ScoreItem[] = [];

  for (const labelGroup of labels) {
    const primaryLabel = labelGroup.split('|')[0]; // 영문 레이블 (표시용)
    const re = new RegExp(
      `(?:${labelGroup})[^\\d]*(\\d{1,2})\\/10[\\s—–-]*([^\\n]{0,200})`,
      'i'
    );
    const match = markdown.match(re);

    if (match) {
      scores.push({
        label: primaryLabel,
        value: Math.min(10, Math.max(0, parseInt(match[1], 10))),
        justification: match[2]?.trim().replace(/\*+/g, '') ?? '',
      });
    } else {
      scores.push({ label: primaryLabel, value: 0, justification: '' });
    }
  }

  return scores;
}

/**
 * 마크다운 전체에서 구조화 데이터 파싱
 */
export function parseReport(markdown: string): ParsedReport {
  const { verdict, summary } = extractVerdict(markdown);
  const scores = extractScores(markdown);

  return {
    verdict,
    verdictSummary: summary,
    scores,
  };
}
