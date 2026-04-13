import fs from 'fs/promises';
import path from 'path';

export interface GuideContent {
  systemPrompt: string;   // CLAUDE.md
  guideContext: string;   // _guide/*.md 파일 전체 합산
}

/**
 * CLAUDE.md 를 시스템 프롬프트로, _guide/*.md 를 분석 컨텍스트로 로드
 */
export async function loadGuide(): Promise<GuideContent> {
  const root = process.cwd();

  // CLAUDE.md 로드
  const claudeMdPath = path.join(root, 'CLAUDE.md');
  let systemPrompt = '';
  try {
    systemPrompt = await fs.readFile(claudeMdPath, 'utf-8');
  } catch {
    systemPrompt = 'You are a senior business analyst and startup strategist.';
  }

  // _guide/*.md 전체 로드 및 병합
  const guideDir = path.join(root, '_guide');
  let guideFiles: string[] = [];
  try {
    guideFiles = (await fs.readdir(guideDir))
      .filter((f) => f.endsWith('.md'))
      .sort(); // 알파벳순 정렬: base, business_model, improvement, market, risk, scoring
  } catch {
    return { systemPrompt, guideContext: '' };
  }

  const sections = await Promise.all(
    guideFiles.map(async (file) => {
      const content = await fs.readFile(path.join(guideDir, file), 'utf-8');
      const sectionName = file.replace('.md', '').replace(/_/g, ' ').toUpperCase();
      return `\n\n===== GUIDE: ${sectionName} =====\n\n${content}`;
    })
  );

  const guideContext = sections.join('');

  return { systemPrompt, guideContext };
}
