/**
 * WorkImage 组件 - 作品图片展示
 * 展示作品高清图片，并集成交互热点层和防下载保护
 */

import Image from 'next/image';
import HotspotLayer from './HotspotLayer';
import ImageProtection from '../common/ImageProtection';
import type { Work } from '@/types/content';

interface WorkImageProps {
  work: Work;
}

export default function WorkImage({ work }: WorkImageProps) {
  return (
    <div className="mb-12">
      {/* 图片容器 - 最大宽度 1200px，居中显示 */}
      <div className="relative max-w-4xl mx-auto">
        <ImageProtection>
          {/* 作品图片 */}
          <div className="relative w-full aspect-[4/3] rounded-card overflow-hidden shadow-2xl">
            <Image
              src={work.image}
              alt={work.title}
              fill
              className="object-contain"
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
            
            {/* 交互热点层 */}
            {work.hotspots && work.hotspots.length > 0 && (
              <HotspotLayer hotspots={work.hotspots} />
            )}
          </div>
        </ImageProtection>
      </div>
    </div>
  );
}
