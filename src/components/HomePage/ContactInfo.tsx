/**
 * ContactInfo 组件 - 联系方式展示
 * 展示联系方式列表，使用图标和文字的卡片式布局
 */

import type { ContactItem } from '@/types/content';

interface ContactInfoProps {
  items: ContactItem[];
}

// 图标组件映射
const IconMap: Record<string, React.FC<{ className?: string }>> = {
  email: ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  wechat: ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M8.5 11c.8 0 1.5-.7 1.5-1.5S9.3 8 8.5 8 7 8.7 7 9.5 7.7 11 8.5 11zm7 0c.8 0 1.5-.7 1.5-1.5S16.3 8 15.5 8 14 8.7 14 9.5s.7 1.5 1.5 1.5zM12 2C6.5 2 2 6 2 11c0 3.2 2.1 6 5.2 7.5L6 22l4.5-2.5c.5.1 1 .1 1.5.1 5.5 0 10-4 10-9s-4.5-9-10-9z"/>
    </svg>
  ),
  weibo: ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M9.5 14.5c-1.7 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3-1.3-3-3-3zm0 4.5c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5 1.5.7 1.5 1.5-.7 1.5-1.5 1.5zm8-10c-2.8 0-5 2.2-5 5 0 .3 0 .5.1.8-1.5-.5-2.6-1.8-2.6-3.3 0-2.2 1.8-4 4-4 .5 0 1 .1 1.5.3.3-.5.7-.9 1.2-1.2-.8-.4-1.7-.6-2.7-.6-3.3 0-6 2.7-6 6 0 2.4 1.4 4.5 3.5 5.5-.2.5-.3 1-.3 1.5 0 2.8 2.2 5 5 5s5-2.2 5-5c0-2.8-2.2-5-5-5z"/>
    </svg>
  ),
  instagram: ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" strokeWidth={2}/>
      <path strokeWidth={2} d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeWidth={2}/>
    </svg>
  ),
  behance: ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M6.5 12.4c.4.2.7.6.7 1.1 0 1.1-.9 1.9-2.1 1.9H2V8.6h3c1.1 0 1.9.7 1.9 1.7 0 .6-.3 1-.9 1.1zm-3.3-2.5v1.7h1.4c.4 0 .7-.3.7-.8 0-.5-.3-.9-.7-.9H3.2zm1.5 4.4c.5 0 .9-.4.9-.9s-.4-.9-.9-.9H3.2v1.8h1.5zM15 8.6h4v1.2h-4V8.6zm-1.5 4.9c0-2.1 1.7-3.8 3.8-3.8s3.8 1.7 3.8 3.8-1.7 3.8-3.8 3.8-3.8-1.7-3.8-3.8zm6.3 0c0-1.4-1.1-2.5-2.5-2.5s-2.5 1.1-2.5 2.5 1.1 2.5 2.5 2.5 2.5-1.1 2.5-2.5z"/>
    </svg>
  ),
  dribbble: ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" strokeWidth={2}/>
      <path strokeWidth={2} d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.5m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"/>
    </svg>
  ),
  linkedin: ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
    </svg>
  ),
  phone: ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  ),
};

export default function ContactInfo({ items }: ContactInfoProps) {
  return (
    <section className="py-12 px-4 border-t border-thin border-primary border-opacity-10">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8">联系方式</h2>
        
        {/* 联系方式网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item, index) => {
            const Icon = IconMap[item.icon];
            const isLink = item.value.startsWith('http');
            
            return (
              <div
                key={index}
                data-testid={`contact-item-${index}`}
                className="flex items-center gap-3 p-4 rounded-soft 
                         border border-thin border-primary border-opacity-10
                         hover:border-opacity-30 transition-all duration-300"
              >
                {/* 图标 */}
                {Icon && (
                  <div data-testid={`icon-${item.icon}`}>
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                )}
                
                {/* 文字内容 */}
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-primary opacity-60 mb-1">
                    {item.label}
                  </div>
                  {isLink ? (
                    <a
                      href={item.value}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:opacity-70 transition-opacity truncate block"
                    >
                      {item.value.replace(/^https?:\/\//, '')}
                    </a>
                  ) : (
                    <div className="text-primary truncate">{item.value}</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
