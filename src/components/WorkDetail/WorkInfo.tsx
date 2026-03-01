/**
 * WorkInfo 组件 - 作品信息展示
 * 展示作品标题和项目简介
 */

import type { Work } from '@/types/content';

interface WorkInfoProps {
  work: Work;
}

export default function WorkInfo({ work }: WorkInfoProps) {
  return (
    <section className="max-w-4xl mx-auto border-t border-thin border-primary border-opacity-10 pt-8">
      {/* 作品标题 */}
      <h1 className="text-3xl md:text-4xl font-bold text-primary mb-6">
        {work.title}
      </h1>
      
      {/* 项目简介 */}
      <div 
        className="prose prose-lg max-w-none text-primary leading-relaxed"
        dangerouslySetInnerHTML={{ __html: work.description }}
      />
    </section>
  );
}
