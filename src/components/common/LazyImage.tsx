/**
 * LazyImage 组件 - 懒加载图片
 * 使用 Intersection Observer API 实现图片懒加载
 * 提前 50px 开始加载图片，提升用户体验
 */

'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface LazyImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  fill?: boolean;
  priority?: boolean;
}

export default function LazyImage({
  src,
  alt,
  width,
  height,
  className,
  fill = false,
  priority = false,
}: LazyImageProps) {
  const [isVisible, setIsVisible] = useState(priority); // priority 图片立即加载
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 如果是优先加载的图片，跳过懒加载
    if (priority) return;

    // 创建 Intersection Observer
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px', // 提前 50px 开始加载
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  return (
    <div ref={imgRef} className={className}>
      {isVisible ? (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          fill={fill}
          loading={priority ? 'eager' : 'lazy'}
          className={className}
        />
      ) : (
        // 占位符 - 显示加载动画
        <div
          className="bg-primary bg-opacity-5 animate-pulse"
          style={{
            width: fill ? '100%' : width,
            height: fill ? '100%' : height,
          }}
        />
      )}
    </div>
  );
}
