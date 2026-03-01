/**
 * 内容数据类型定义
 * 定义了网站中使用的所有数据结构
 */

// 个人介绍
export interface Profile {
  avatar: string;        // 头像图片路径
  bio: string;          // 个人介绍文字（Markdown 格式）
}

// 作品分类
export interface Category {
  title: string;        // 分类显示名称
  slug: string;         // 分类 URL 标识
  order: number;        // 排序权重（数字越小越靠前）
}

// 交互热点
export interface Hotspot {
  id: string;           // 热点唯一标识
  shape: 'rectangle' | 'circle';  // 热点形状
  position: {
    x: number;          // X 坐标（百分比 0-100）
    y: number;          // Y 坐标（百分比 0-100）
    width: number;      // 宽度（百分比 0-100）
    height: number;     // 高度（百分比 0-100）
  };
  description: string;  // 热点说明文字
}

// 作品
export interface Work {
  title: string;        // 作品标题
  slug: string;         // 作品 URL 标识
  category: string;     // 所属分类（关联 Category 的 slug）
  image: string;        // 作品图片路径
  description: string;  // 项目简介（Markdown 格式）
  order: number;        // 排序权重
  hotspots?: Hotspot[]; // 交互热点数组（可选）
}

// 联系方式
export interface ContactItem {
  icon: 'email' | 'wechat' | 'weibo' | 'instagram' | 'behance' | 'dribbble' | 'linkedin' | 'phone';
  label: string;        // 显示标签
  value: string;        // 联系方式内容（可以是文本或链接）
}

export interface Contact {
  items: ContactItem[];
}

// 网站设置
export interface Settings {
  siteTitle: string;    // 网站标题
  privateMode: boolean; // 私密模式开关
  analytics: {
    enabled: boolean;   // 是否启用统计
    googleAnalyticsId: string;  // Google Analytics 跟踪 ID
  };
}
