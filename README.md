# 个人作品集网站

这是一个基于 Next.js 的静态作品集网站，专为平面设计师打造。网站支持交互式作品展示、可视化内容管理，并可免费部署到 GitHub Pages。

## ✨ 功能特点

- 🎨 **简洁美观的设计**：Instagram 风格，圆角设计，细线条装饰
- 🖼️ **交互式作品展示**：支持在作品图片上添加可交互的设计思路说明
- 📝 **零代码内容管理**：通过 Decap CMS 可视化编辑界面管理内容
- 🔒 **灵活的访问控制**：支持私密模式和公开模式切换
- 📱 **完全响应式**：在桌面、平板、移动设备上都有良好体验
- 🚀 **性能优异**：静态生成，加载速度快
- 💰 **完全免费**：部署在 GitHub Pages，无需服务器成本

## 🛠️ 技术栈

- **前端框架**：Next.js 14 (App Router)
- **样式方案**：Tailwind CSS
- **动画库**：Framer Motion
- **内容管理**：Decap CMS
- **部署平台**：GitHub Pages
- **语言**：TypeScript

## 📁 项目结构

```
portfolio-website/
├── src/
│   ├── app/                    # Next.js 页面
│   │   ├── layout.tsx         # 根布局
│   │   ├── page.tsx           # 首页
│   │   ├── works/             # 作品相关页面
│   │   └── globals.css        # 全局样式
│   ├── components/            # React 组件
│   │   ├── HomePage/          # 首页组件
│   │   ├── WorkGallery/       # 作品列表组件
│   │   ├── WorkDetail/        # 作品详情组件
│   │   └── common/            # 通用组件
│   ├── lib/                   # 工具函数
│   │   └── contentLoader.ts  # 内容加载器
│   └── types/                 # TypeScript 类型定义
│       └── content.ts
├── content/                   # 内容数据
│   ├── profile.md            # 个人介绍
│   ├── categories/           # 作品分类
│   ├── works/                # 作品内容
│   ├── contact.json          # 联系方式
│   └── settings.json         # 网站设置
├── public/                    # 静态资源
│   ├── admin/                # Decap CMS 配置
│   └── images/               # 图片资源
├── docs/                      # 文档
│   ├── CMS-GUIDE.md          # CMS 使用手册
│   └── DEPLOYMENT.md         # 部署指南
└── README.md                 # 项目说明（本文件）
```

## 🚀 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 启动开发服务器

```bash
npm run dev
```

打开浏览器访问 [http://localhost:3000](http://localhost:3000)

### 3. 编辑内容

在 `content/` 目录下编辑以下文件：

- `profile.md` - 个人介绍
- `categories/*.json` - 作品分类
- `works/*.md` - 作品内容
- `contact.json` - 联系方式
- `settings.json` - 网站设置

### 4. 构建生产版本

```bash
npm run build
```

生成的静态文件将输出到 `out/` 目录。

## 📖 详细文档

- [CMS 使用手册](./docs/CMS-GUIDE.md) - 如何使用 Decap CMS 管理内容
- [部署指南](./docs/DEPLOYMENT.md) - 如何部署到 GitHub Pages

## 🎨 配色方案

- **主色**：`#1b1b1b` - 深黑色（用于文字和主要元素）
- **辅色**：`#fffbee` - 米白色（用于背景）
- **点缀色**：`#ffffff` - 纯白色（用于强调元素）

## 📝 可用脚本

- `npm run dev` - 启动开发服务器
- `npm run build` - 构建生产版本
- `npm run start` - 启动生产服务器（用于本地预览）
- `npm run lint` - 运行代码检查
- `npm test` - 运行测试
- `npm run test:watch` - 监听模式运行测试
- `npm run test:coverage` - 生成测试覆盖率报告

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

## 💡 提示

- 所有代码都包含详细的中文注释
- 如果遇到问题，请查看 `docs/` 目录下的文档
- 建议先在本地测试，确认无误后再部署到 GitHub Pages
