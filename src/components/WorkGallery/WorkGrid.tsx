/**
 * WorkGrid 组件 - 作品网格布局
 * 使用响应式网格展示作品卡片
 * 桌面：3列，平板：2列，移动：1列
 */

import WorkCard from './WorkCard';
import type { Work } from '@/types/content';

interface WorkGridProps {
  works: Work[];
}

export default function WorkGrid({ works }: WorkGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {works.map((work) => (
        <WorkCard key={work.slug} work={work} />
      ))}
    </div>
  );
}
