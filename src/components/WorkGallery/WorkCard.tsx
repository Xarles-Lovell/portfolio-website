/**
 * WorkCard 组件 - 作品卡片
 * 展示作品缩略图和标题，点击后导航到作品详情页
 */

'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import type { Work } from '@/types/content';

interface WorkCardProps {
  work: Work;
}

export default function WorkCard({ work }: WorkCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/works/${work.category}/${work.slug}`);
  };

  return (
    <article
      data-testid={`work-card-${work.slug}`}
      onClick={handleClick}
      className="group cursor-pointer"
    >
      {/* 作品卡片容器 */}
      <div className="relative overflow-hidden rounded-card bg-primary 
                    shadow-lg hover:shadow-xl transition-all duration-300
                    hover:-translate-y-1">
        {/* 作品缩略图 - 4:3 比例 */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={work.image}
            alt={work.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* 半透明遮罩层 */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        {/* 作品标题 - 叠加在图片底部 */}
        <div className="absolute bottom-0 left-0 right-0 p-4 
                      bg-gradient-to-t from-primary to-transparent">
          <h3 className="text-accent font-medium text-lg line-clamp-2">
            {work.title}
          </h3>
        </div>
      </div>
    </article>
  );
}
