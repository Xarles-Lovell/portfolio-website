import type { Metadata } from 'next'
import Script from 'next/script'
import PageTransition from '@/components/common/PageTransition'
import { loadSettings } from '@/lib/settings'
import './globals.css'

// 动态生成 metadata
export async function generateMetadata(): Promise<Metadata> {
  const settings = loadSettings();

  const metadata: Metadata = {
    title: settings.siteTitle,
    description: '个人设计作品展示',
  };

  // 如果是私密模式，添加 noindex 和 nofollow
  if (settings.privateMode) {
    metadata.robots = {
      index: false,
      follow: false,
    };
  }

  return metadata;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <head>
        {/* Netlify Identity Widget - 用于 CMS 登录认证 */}
        <Script src="https://identity.netlify.com/v1/netlify-identity-widget.js" />
      </head>
      <body>
        <PageTransition>
          {children}
        </PageTransition>
      </body>
    </html>
  )
}
