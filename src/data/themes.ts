import type { ArtType } from './art';

export type ThemeId = 'lab' | 'editorial' | 'gallery';

export interface Theme {
  id: ThemeId;
  art: ArtType;
  letter: string;
  name: string;
  ja: string;
  description: string;
  tags: string;
  /** Heading on the comparison page card. */
  conceptTitle: { text: string; em?: string; note?: string };
  /** Character after the "handism" wordmark. */
  wordmarkMark: string;
  headerNote: string;
  status: string;
  hero: {
    eyebrow: string;
    title: string;
    titleEm: string;
    jp: string;
    description: readonly string[];
    cta: string;
    bottom: string;
  };
  work: { eyebrow: string; title: string };
  /** Phrases for the scrolling ticker below the hero. */
  ticker?: readonly string[];
  /** Lines of the rotating stamp in the hero. */
  stamp?: readonly string[];
}

export const themes: readonly Theme[] = [
  {
    id: 'lab',
    art: 'orbit',
    letter: 'A',
    name: 'Midnight Lab',
    ja: '夜の制作ラボ',
    description: '静かな夜に、好奇心が動き出す。',
    tags: 'DARK / TECH / PLAYFUL',
    conceptTitle: { text: 'Midnight', em: 'Lab.' },
    wordmarkMark: '.',
    headerNote: 'INDEPENDENT DEVELOPER',
    status: 'ALWAYS EXPLORING',
    hero: {
      eyebrow: 'IDEAS, EXPERIMENTS & LITTLE OBSESSIONS',
      title: 'Make things.',
      titleEm: 'Feel things.',
      jp: '好奇心を、動くものに。',
      description: [
        '日々の「こんなのあったら」を、コードでかたちに。',
        'Web、AI、そしてちょっと変わった体験をつくっています。',
      ],
      cta: 'つくったものを見る',
      bottom: 'WEB / AI / TOOLS / EXPERIMENTS',
    },
    work: { eyebrow: 'SELECTED WORK', title: 'Small ideas. Real things.' },
    ticker: ['BUILD WITH CURIOSITY', 'MAKE IT PERSONAL'],
  },
  {
    id: 'editorial',
    art: 'flower',
    letter: 'B',
    name: 'The Edit',
    ja: '編集部の作品集',
    description: '余白と文字で、つくったものを語る。',
    tags: 'LIGHT / TYPE / EDITORIAL',
    conceptTitle: { text: 'The', em: 'Edit.' },
    wordmarkMark: '®',
    headerNote: 'THE PORTFOLIO ISSUE / 2026',
    status: 'DESIGNING THROUGH CODE',
    hero: {
      eyebrow: 'A PERSONAL COLLECTION BY HANDISM',
      title: 'Curiosity,',
      titleEm: 'made tangible.',
      jp: '好奇心を、かたちにする。',
      description: [
        '暮らしの小さな不便から、好きなことの探求まで。',
        '考えて、試して、つくってきたものの記録。',
      ],
      cta: 'つくったものを見る',
      bottom: 'VOLUME 01 — SELECTED WORKS',
    },
    work: { eyebrow: 'SELECTED WORK', title: 'Selected works.' },
    stamp: ['THINK', 'MAKE', 'REPEAT ↗'],
  },
  {
    id: 'gallery',
    art: 'portal',
    letter: 'C',
    name: 'Elsewhere',
    ja: 'デジタル展示室',
    description: 'スクロールの先に、別の世界。',
    tags: 'IMMERSIVE / ART / MOTION',
    conceptTitle: { text: 'Elsewhere', note: '好奇心の、その先へ。' },
    wordmarkMark: '.',
    headerNote: 'A COLLECTION OF CURIOSITIES',
    status: 'ENTER A DIFFERENT PERSPECTIVE',
    hero: {
      eyebrow: 'CODE IS JUST THE BEGINNING.',
      title: 'Somewhere',
      titleEm: 'beyond ordinary.',
      jp: '好奇心の、その先へ。',
      description: [
        '音、記憶、道具、知識。',
        'コードから生まれた、小さな世界を巡る。',
      ],
      cta: '展示を巡る',
      bottom: 'WEB / AI / TOOLS / EXPERIMENTS',
    },
    work: { eyebrow: 'THE EXHIBITION', title: 'Worlds to discover.' },
  },
];

export function getTheme(id: ThemeId): Theme {
  const theme = themes.find((theme) => theme.id === id);
  if (!theme) throw new Error(`Unknown theme: ${id}`);
  return theme;
}
