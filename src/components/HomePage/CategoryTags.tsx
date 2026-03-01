/**
 * CategoryTags 组件 - 作品分类标签
 * 展示所有分类标签，点击后导航到对应的作品展示页
 */

'use client';

import { useRouter } from 'next/navigation';
import type { Category } from '@/types/content';

interface CategoryTagsProps {
  categories: Category[];
}

export default function CategoryTags({ categories }: CategoryTagsProps) {
  const router = useRouter();

  const handleClick = (slug: string) => {
    router.push(`/works/${slug}`);
  };

  return (
    <section className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* 分类标签容器 */}
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((category, index) => (
            <div key={category.slug} className="flex items-center">
              {/* 分类标签按钮 */}
              <button
                onClick={() => handleClick(category.slug)}
                className="px-6 py-3 bg-primary text-accent rounded-soft 
                         hover:bg-opacity-90 transition-all duration-300
                         hover:scale-105 active:scale-95"
              >
                {category.title}
              </button>
              
              {/* 细线条分隔符（最后一个标签不显示） */}
              {index < categories.length - 1 && (
                <div className="w-px h-6 bg-primary opacity-20 mx-2" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
