/** @type {import('next').NextConfig} */
const nextConfig = {
  // 启用静态导出，生成纯静态 HTML 文件
  // 这样可以部署到 GitHub Pages
  output: 'export',
  
  // 配置图片优化
  // 静态导出需要使用 unoptimized: true
  images: {
    unoptimized: true,
  },
  
  // 如果使用 GitHub 项目页面（而非用户页面），需要配置 basePath
  // 例如：basePath: '/portfolio-website'
  // 如果使用用户页面（username.github.io），则不需要 basePath
  // basePath: '',
  
  // 启用 trailing slash，确保 URL 以 / 结尾
  trailingSlash: true,
  
  // 配置资源前缀（可选，用于 CDN）
  // assetPrefix: '',
};

module.exports = nextConfig;
