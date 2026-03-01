/**
 * 内容加载器
 * 负责从文件系统读取和解析内容数据
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import type { Profile, Category, Work, Contact, Settings } from '@/types/content';

// 内容目录的根路径
const contentDirectory = path.join(process.cwd(), 'content');

/**
 * 加载个人介绍
 * @returns Profile 对象
 */
export async function loadProfile(): Promise<Profile> {
  const filePath = path.join(contentDirectory, 'profile.md');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  
  // 使用 gray-matter 解析 Markdown frontmatter
  const { data, content } = matter(fileContents);
  
  // 将 Markdown 转换为 HTML
  const processedContent = await remark()
    .use(html)
    .process(content);
  const bioHtml = processedContent.toString();
  
  return {
    avatar: data.avatar,
    bio: bioHtml,
  };
}

/**
 * 加载所有作品分类
 * @returns Category 数组，按 order 排序
 */
export function loadCategories(): Category[] {
  const categoriesDir = path.join(contentDirectory, 'categories');
  
  // 读取分类目录下的所有 JSON 文件
  const filenames = fs.readdirSync(categoriesDir);
  
  const categories = filenames
    .filter(filename => filename.endsWith('.json'))
    .map(filename => {
      const filePath = path.join(categoriesDir, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(fileContents) as Category;
    });
  
  // 按 order 字段排序
  return categories.sort((a, b) => a.order - b.order);
}

/**
 * 加载作品列表
 * @param category 可选，指定分类的 slug，如果不提供则返回所有作品
 * @returns Work 数组，按 order 排序
 */
export async function loadWorks(category?: string): Promise<Work[]> {
  const worksDir = path.join(contentDirectory, 'works');
  
  // 读取作品目录下的所有 Markdown 文件
  const filenames = fs.readdirSync(worksDir);
  
  const works = await Promise.all(
    filenames
      .filter(filename => filename.endsWith('.md'))
      .map(async filename => {
        const filePath = path.join(worksDir, filename);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        
        // 解析 frontmatter
        const { data, content } = matter(fileContents);
        
        // 将 Markdown 转换为 HTML
        const processedContent = await remark()
          .use(html)
          .process(content);
        const descriptionHtml = processedContent.toString();
        
        return {
          title: data.title,
          slug: data.slug,
          category: data.category,
          image: data.image,
          description: descriptionHtml,
          order: data.order || 0,
          hotspots: data.hotspots || [],
        } as Work;
      })
  );
  
  // 如果指定了分类，则过滤
  const filteredWorks = category
    ? works.filter(work => work.category === category)
    : works;
  
  // 按 order 字段排序
  return filteredWorks.sort((a, b) => a.order - b.order);
}

/**
 * 加载单个作品
 * @param slug 作品的 slug
 * @returns Work 对象，如果不存在则返回 null
 */
export async function loadWork(slug: string): Promise<Work | null> {
  const works = await loadWorks();
  return works.find(work => work.slug === slug) || null;
}

/**
 * 加载联系方式
 * @returns Contact 对象
 */
export function loadContact(): Contact {
  const filePath = path.join(contentDirectory, 'contact.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents) as Contact;
}

/**
 * 加载网站设置
 * @returns Settings 对象
 */
export function loadSettings(): Settings {
  const filePath = path.join(contentDirectory, 'settings.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents) as Settings;
}
