/**
 * 作品展示页
 * 展示指定分类下的所有作品
 */

import Link from 'next/link';
import WorkGrid from '@/components/WorkGallery/WorkGrid';
import RandomButton from '@/components/WorkGallery/RandomButton';
import { loadWorks, loadCategories } from '@/lib/contentLoader';

interface WorkGalleryPageProps {
  params: {
    category: string;
  };
}

export default async function WorkGalleryPage({ params }: WorkGalleryPageProps) {
  const { category } = params;
  
  // 加载当前分类的作品
  const works = await loadWorks(category);
  
  // 加载所有分类以获取当前分类的标题
  const categories = loadCategories();
  const currentCategory = categories.find(cat => cat.slug === category);
  
  return (
    <main className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* 页面头部 */}
        <header className="mb-12">
          <div className="flex items-center justify-between mb-6">
            {/* 返回首页按钮 */}
            <Link
              href="/"
              className="flex items-center gap-2 text-primary hover:opacity-70 transition-opacity"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>返回首页</span>
            </Link>
            
            {/* 随机查看按钮 */}
            <RandomButton works={works} category={category} />
          </div>
          
          {/* 分类标题 */}
          <h1 className="text-4xl font-bold text-center text-primary">
            {currentCategory?.title || '作品展示'}
          </h1>
        </header>
        
        {/* 作品网格 */}
        {works.length > 0 ? (
          <WorkGrid works={works} />
        ) : (
          <div className="text-center py-20 text-primary opacity-60">
            <p>暂无作品</p>
          </div>
        )}
      </div>
    </main>
  );
}

// 生成静态路径（用于静态导出）
export async function generateStaticParams() {
  const categories = loadCategories();
  
  return categories.map((category) => ({
    category: category.slug,
  }));
}
