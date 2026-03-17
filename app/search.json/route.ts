import { getAllPostMeta } from '@/src/lib/posts-server';
import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

export async function GET() {
  const posts = await getAllPostMeta();
  return NextResponse.json(posts);
}
