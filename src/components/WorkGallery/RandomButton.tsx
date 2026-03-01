/**
 * RandomButton 组件 - 随机查看按钮
 * 点击后随机选择一个作品并导航到详情页
 */

'use client';

import { useRouter } from 'next/navigation';
import type { Work } from '@/types/content';

interface RandomButtonProps {
  works: Work[];
  category: string;
}

export default function RandomButton({ works, category }: RandomButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    if (works.length === 0) return;
    
    // 随机选择一个作品
    const randomIndex = Math.floor(Math.random() * works.length);
    const randomWork = works[randomIndex];
    
    // 导航到随机作品的详情页
    router.push(`/works/${category}/${randomWork.slug}`);
  };

  return (
    <button
      onClick={handleClick}
      disabled={works.length === 0}
      className="px-4 py-2 border-2 border-accent text-primary rounded-soft
               hover:bg-accent hover:text-primary transition-all duration-300
               disabled:opacity-50 disabled:cursor-not-allowed
               active:scale-95"
    >
      <span className="flex items-center gap-2">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        随机查看
      </span>
    </button>
  );
}
