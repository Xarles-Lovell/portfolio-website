/**
 * 动态生成 sitemap.xml
 * 包含所有页面的 URL，帮助搜索引擎索引
 */

import { loadWorks, loadCategories } from '@/lib/contentLoader';
import type { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://your-username.github.io';
  
  // 加载所有分类和作品
  const categories = loadCategories();
  const works = await loadWorks();

  // 首页
  const homepage = {
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 1,
  };

  // 分类页面
  const categoryPages = categories.map((category) => ({
    url: `${baseUrl}/works/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // 作品详情页面
  const workPages = works.map((work) => ({
    url: `${baseUrl}/works/${work.category}/${work.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [homepage, ...categoryPages, ...workPages];
}
