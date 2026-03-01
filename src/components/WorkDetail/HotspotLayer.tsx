/**
 * HotspotLayer 组件 - 交互热点层
 * 在作品图片上渲染可交互的热点区域
 * 桌面端：鼠标悬停显示说明
 * 移动端：点击切换显示说明
 */

'use client';

import { useState, useEffect } from 'react';
import type { Hotspot } from '@/types/content';

interface HotspotLayerProps {
  hotspots: Hotspot[];
}

export default function HotspotLayer({ hotspots }: HotspotLayerProps) {
  const [activeHotspotId, setActiveHotspotId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // 检测是否为移动设备
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 处理热点交互
  const handleHotspotInteraction = (hotspotId: string, isEnter: boolean) => {
    if (isMobile) {
      // 移动端：点击切换显示/隐藏
      setActiveHotspotId(activeHotspotId === hotspotId ? null : hotspotId);
    } else {
      // 桌面端：悬停显示，移出隐藏
      setActiveHotspotId(isEnter ? hotspotId : null);
    }
  };

  return (
    <div className="absolute inset-0 pointer-events-none">
      {hotspots.map((hotspot) => {
        const isActive = activeHotspotId === hotspot.id;
        
        return (
          <div
            key={hotspot.id}
            data-testid={`hotspot-${hotspot.id}`}
            className="absolute pointer-events-auto"
            style={{
              left: `${hotspot.position.x}%`,
              top: `${hotspot.position.y}%`,
              width: `${hotspot.position.width}%`,
              height: `${hotspot.position.height}%`,
            }}
            onMouseEnter={() => !isMobile && handleHotspotInteraction(hotspot.id, true)}
            onMouseLeave={() => !isMobile && handleHotspotInteraction(hotspot.id, false)}
            onClick={() => isMobile && handleHotspotInteraction(hotspot.id, true)}
          >
            {/* 热点区域边框（仅在激活时显示） */}
            {isActive && (
              <div
                className={`absolute inset-0 border-2 border-accent 
                          ${hotspot.shape === 'circle' ? 'rounded-full' : 'rounded-soft'}
                          animate-pulse`}
              />
            )}
            
            {/* 热点提示框 */}
            {isActive && (
              <div
                className="absolute z-10 min-w-[200px] max-w-[300px] p-3 
                         bg-primary bg-opacity-90 text-accent rounded-soft
                         shadow-xl animate-fadeIn"
                style={{
                  // 智能定位：如果热点在图片上半部分，提示框显示在下方，否则显示在上方
                  [hotspot.position.y < 50 ? 'top' : 'bottom']: '100%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  marginTop: hotspot.position.y < 50 ? '8px' : undefined,
                  marginBottom: hotspot.position.y >= 50 ? '8px' : undefined,
                }}
              >
                {/* 箭头指示器 */}
                <div
                  className="absolute left-1/2 -translate-x-1/2 w-0 h-0 
                           border-l-8 border-r-8 border-transparent"
                  style={{
                    [hotspot.position.y < 50 ? 'top' : 'bottom']: '100%',
                    borderBottomColor: hotspot.position.y < 50 ? 'rgba(27, 27, 27, 0.9)' : undefined,
                    borderTopColor: hotspot.position.y >= 50 ? 'rgba(27, 27, 27, 0.9)' : undefined,
                    borderBottomWidth: hotspot.position.y < 50 ? '8px' : undefined,
                    borderTopWidth: hotspot.position.y >= 50 ? '8px' : undefined,
                  }}
                />
                
                {/* 说明文字 */}
                <p className="text-sm leading-relaxed">{hotspot.description}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
