/**
 * 动态生成 robots.txt
 * 根据私密模式设置控制搜索引擎爬虫访问
 */

import { loadSettings } from '@/lib/settings';
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const settings = loadSettings();

  if (settings.privateMode) {
    // 私密模式：禁止所有搜索引擎爬虫
    return {
      rules: {
        userAgent: '*',
        disallow: '/',
      },
    };
  }

  // 公开模式：允许所有搜索引擎爬虫
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://your-username.github.io/sitemap.xml',
  };
}
