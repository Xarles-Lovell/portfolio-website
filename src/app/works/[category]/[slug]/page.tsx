/**
 * 作品详情页
 * 展示作品的完整信息，包括图片、简介和交互热点
 */

import Link from 'next/link';
import WorkImage from '@/components/WorkDetail/WorkImage';
import WorkInfo from '@/components/WorkDetail/WorkInfo';
import { loadWorks, loadWork } from '@/lib/contentLoader';

interface WorkDetailPageProps {
  params: {
    category: string;
    slug: string;
  };
}

export default async function WorkDetailPage({ params }: WorkDetailPageProps) {
  const { category, slug } = params;
  
  // 加载当前作品
  const work = await loadWork(slug);
  
  if (!work) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">作品不存在</h1>
          <Link href={`/works/${category}`} className="text-primary hover:opacity-70">
            返回作品列表
          </Link>
        </div>
      </main>
    );
  }
  
  // 加载同分类的所有作品，用于上一个/下一个导航
  const allWorks = await loadWorks(category);
  const currentIndex = allWorks.findIndex(w => w.slug === slug);
  const prevWork = currentIndex > 0 ? allWorks[currentIndex - 1] : null;
  const nextWork = currentIndex < allWorks.length - 1 ? allWorks[currentIndex + 1] : null;
  
  return (
    <main className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* 导航栏 */}
        <nav className="flex items-center justify-between mb-8">
          {/* 返回列表按钮 */}
          <Link
            href={`/works/${category}`}
            className="flex items-center gap-2 text-primary hover:opacity-70 transition-opacity"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>返回列表</span>
          </Link>
          
          {/* 上一个/下一个作品按钮 */}
          <div className="flex items-center gap-4">
            {prevWork ? (
              <Link
                href={`/works/${category}/${prevWork.slug}`}
                className="flex items-center gap-2 text-primary hover:opacity-70 transition-opacity"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span>上一个</span>
              </Link>
            ) : (
              <div className="opacity-30 cursor-not-allowed">上一个</div>
            )}
            
            <div className="w-px h-6 bg-primary opacity-20" />
            
            {nextWork ? (
              <Link
                href={`/works/${category}/${nextWork.slug}`}
                className="flex items-center gap-2 text-primary hover:opacity-70 transition-opacity"
              >
                <span>下一个</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ) : (
              <div className="opacity-30 cursor-not-allowed">下一个</div>
            )}
          </div>
        </nav>
        
        {/* 作品图片（带交互热点） */}
        <WorkImage work={work} />
        
        {/* 作品信息 */}
        <WorkInfo work={work} />
      </div>
    </main>
  );
}

// 生成静态路径（用于静态导出）
export async function generateStaticParams() {
  const allWorks = await loadWorks();
  
  return allWorks.map((work) => ({
    category: work.category,
    slug: work.slug,
  }));
}
