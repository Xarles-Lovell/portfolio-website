/**
 * Hero 组件 - 首页个人介绍区域
 * 展示头像和个人介绍文字
 */

import Image from 'next/image';
import type { Profile } from '@/types/content';

interface HeroProps {
  profile: Profile;
}

export default function Hero({ profile }: HeroProps) {
  return (
    <section className="flex flex-col items-center justify-center py-16 px-4">
      {/* 头像 - 圆形裁剪，直径 120px */}
      <div className="mb-8">
        <Image
          src={profile.avatar}
          alt="头像"
          width={120}
          height={120}
          className="rounded-full object-cover"
          priority
        />
      </div>

      {/* 个人介绍文字 */}
      <div 
        className="max-w-2xl text-center text-primary leading-relaxed"
        dangerouslySetInnerHTML={{ __html: profile.bio }}
      />
    </section>
  );
}
