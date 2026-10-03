export const projects = [
  {
    id: 'sauna-simulator',
    number: '01',
    title: 'Sauna Simulator',
    ja: 'ブラウザに、ひと息つける場所を。',
    category: 'Experience',
    filter: 'Web',
    art: 'sauna',
    description:
      'サウナ、水風呂、外気浴。音とアニメーションで、ブラウザの中に小さなリラックス体験をつくる。',
    detail:
      'ステージごとの環境音やクロスフェード、呼吸ガイドを組み合わせた体験設計。Web Audio APIを使った音づくりにも取り組んでいます。',
    stack: ['React', 'TypeScript', 'Vite', 'Web Audio API'],
  },
  {
    id: 'sauna-itta',
    number: '02',
    title: 'Sauna Itta',
    ja: 'ととのった記憶を、地図に。',
    category: 'Web application',
    filter: 'Web',
    art: 'map',
    description:
      '訪れたサウナと、次に行きたい場所。地図と記録で、自分だけのサウナの旅を振り返る。',
    detail:
      'Next.jsとRailsを使った構成。オフライン対応のGitHub Pagesデモと、APIを利用するクラウド版を同じフロントエンドから生成します。',
    stack: ['Next.js', 'TypeScript', 'Rails', 'PostgreSQL', 'Leaflet'],
  },
  {
    id: 'mini-brain',
    number: '03',
    title: 'Mini Brain',
    ja: '自分の知識と、会話する。',
    category: 'On-device AI',
    filter: 'AI',
    art: 'brain',
    description:
      '手元のMarkdownを、相談できる知識へ。デバイス内で推論する、個人用のRAGアプリ。',
    detail:
      'キーワード検索とベクトル検索を組み合わせ、必要に応じてエージェントが追加探索する設計。自分のメモを根拠に回答するAndroidアプリです。',
    stack: ['Kotlin', 'Android', 'RAG', 'On-device AI'],
  },
  {
    id: 'memo-explorer',
    number: '04',
    title: 'Memo Explorer',
    ja: '思いつきを、作業のすぐ隣に。',
    category: 'Developer tool',
    filter: 'Tools',
    art: 'memo',
    description:
      'エディタを離れず、メモを探して、書いて、整理する。VS Code / Cursorのための小さな道具。',
    detail:
      'Markdownの全文検索、デイリーノート、ブックマーク、ドラッグ＆ドロップに対応。日々の作業になじむ操作と、複数OSでの検証を大切にしています。',
    stack: ['TypeScript', 'VS Code API', 'GitHub Actions'],
  },
];

export type Project = (typeof projects)[number];
export const projectCount = projects.length;
export const projectCountLabel = String(projectCount).padStart(2, '0');
export const projectFilters = [
  'All',
  ...new Set(projects.map((project) => project.filter)),
];
