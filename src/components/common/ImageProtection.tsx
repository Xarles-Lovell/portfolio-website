/**
 * ImageProtection 组件 - 图片防下载保护
 * 防止访客轻易下载作品图片
 * 
 * 保护措施：
 * 1. 禁用右键菜单
 * 2. 禁用拖拽保存
 * 3. 禁用键盘快捷键保存（Ctrl+S）
 * 4. 覆盖透明保护层
 */

'use client';

import { useEffect } from 'react';

interface ImageProtectionProps {
  children: React.ReactNode;
}

export default function ImageProtection({ children }: ImageProtectionProps) {
  useEffect(() => {
    // 禁用键盘快捷键保存
    const handleKeyDown = (e: KeyboardEvent) => {
      // 禁用 Ctrl+S / Cmd+S
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div
      className="relative select-none"
      onContextMenu={(e) => e.preventDefault()}  // 禁用右键菜单
      onDragStart={(e) => e.preventDefault()}    // 禁用拖拽
    >
      {children}
      
      {/* 透明保护层 */}
      <div className="absolute inset-0 pointer-events-none" />
    </div>
  );
}
