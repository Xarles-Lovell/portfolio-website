/**
 * 首页
 * 展示个人介绍、作品分类标签和联系方式
 */

import Hero from '@/components/HomePage/Hero';
import CategoryTags from '@/components/HomePage/CategoryTags';
import ContactInfo from '@/components/HomePage/ContactInfo';
import { loadProfile, loadCategories, loadContact } from '@/lib/contentLoader';

export default async function Home() {
  // 加载首页所需的所有数据
  const profile = await loadProfile();
  const categories = loadCategories();
  const contact = loadContact();

  return (
    <main className="min-h-screen">
      {/* 个人介绍区域 */}
      <Hero profile={profile} />
      
      {/* 作品分类标签 */}
      <CategoryTags categories={categories} />
      
      {/* 联系方式 */}
      <ContactInfo items={contact.items} />
    </main>
  );
}
