/**
 * PageTransition 组件 - 页面切换动画
 * 使用 Framer Motion 实现平滑的淡入淡出过渡效果
 * 
 * 动画效果：
 * - 进入：从下方淡入（opacity 0→1，y 20→0）
 * - 退出：向上方淡出（opacity 1→0，y 0→-20）
 * - 持续时间：300ms
 */

'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

interface PageTransitionProps {
  children: React.ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{
          duration: 0.3,
          ease: 'easeInOut',
        }}
        // 提示浏览器优化动画性能
        style={{ willChange: 'transform, opacity' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
