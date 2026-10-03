import type { ProjectId } from './projects';

interface Expertise {
  title: string;
  stack: string;
  description: string;
  projectId: ProjectId;
}

export const expertise: readonly Expertise[] = [
  {
    title: 'Interfaces & experiences',
    stack: 'React / Next.js / TypeScript',
    description: 'サウナ体験や、地図で振り返るWebアプリ。',
    projectId: 'sauna-simulator',
  },
  {
    title: 'Intelligence, locally',
    stack: 'Kotlin / Android / RAG',
    description: '自分のメモと会話する、オンデバイスAI。',
    projectId: 'mini-brain',
  },
  {
    title: 'Tools for everyday',
    stack: 'VS Code API / GitHub Actions',
    description: '日々の作業を少し快適にする開発ツール。',
    projectId: 'memo-explorer',
  },
  {
    title: 'Beyond the frontend',
    stack: 'Rails / PostgreSQL / Terraform',
    description: 'アプリを支えるAPI、データ、インフラ設計。',
    projectId: 'sauna-itta',
  },
];
