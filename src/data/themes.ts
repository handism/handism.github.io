export const themes = [
  {
    id: 'lab',
    art: 'orbit',
    letter: 'A',
    name: 'Midnight Lab',
    ja: '夜の制作ラボ',
    description: '静かな夜に、好奇心が動き出す。',
    tags: 'DARK / TECH / PLAYFUL',
  },
  {
    id: 'editorial',
    art: 'flower',
    letter: 'B',
    name: 'The Edit',
    ja: '編集部の作品集',
    description: '余白と文字で、つくったものを語る。',
    tags: 'LIGHT / TYPE / EDITORIAL',
  },
  {
    id: 'gallery',
    art: 'portal',
    letter: 'C',
    name: 'Elsewhere',
    ja: 'デジタル展示室',
    description: 'スクロールの先に、別の世界。',
    tags: 'IMMERSIVE / ART / MOTION',
  },
] as const;

export type Theme = (typeof themes)[number];
export function getTheme(id: Theme['id']): Theme {
  const theme = themes.find((theme) => theme.id === id);
  if (!theme) throw new Error(`Unknown theme: ${id}`);
  return theme;
}
