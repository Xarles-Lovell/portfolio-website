# 部署指南

本指南将帮助你将个人作品集网站部署到 GitHub Pages，并配置 Decap CMS 的认证系统。

## 目录

1. [前置准备](#前置准备)
2. [创建 GitHub 仓库](#创建-github-仓库)
3. [启用 GitHub Pages](#启用-github-pages)
4. [配置 Netlify Identity（CMS 认证）](#配置-netlify-identity)
5. [配置环境变量](#配置环境变量)
6. [首次部署](#首次部署)
7. [验证部署](#验证部署)
8. [故障排查](#故障排查)

---

## 前置准备

在开始部署之前，请确保你已经：

- ✅ 拥有 GitHub 账号
- ✅ 在本地完成了项目开发
- ✅ 项目可以在本地正常运行（`npm run dev`）
- ✅ 已安装 Git 并配置好 GitHub 凭证

---

## 创建 GitHub 仓库

### 步骤 1：在 GitHub 上创建新仓库

1. 登录 [GitHub](https://github.com)
2. 点击右上角的 `+` 按钮，选择 `New repository`
3. 填写仓库信息：
   - **Repository name**：`portfolio-website`（或你喜欢的名称）
   - **Description**：个人作品集网站
   - **Visibility**：选择 `Public`（公开仓库才能使用免费的 GitHub Pages）
   - **不要**勾选 "Initialize this repository with a README"（因为本地已有项目）
4. 点击 `Create repository` 按钮

### 步骤 2：将本地项目推送到 GitHub

在项目根目录（`portfolio-website/`）打开终端，执行以下命令：

```bash
# 初始化 Git 仓库（如果还没有初始化）
git init

# 添加所有文件到暂存区
git add .

# 提交代码
git commit -m "Initial commit: Portfolio website"

# 添加远程仓库（替换 YOUR_USERNAME 为你的 GitHub 用户名）
git remote add origin https://github.com/YOUR_USERNAME/portfolio-website.git

# 推送代码到 GitHub
git branch -M main
git push -u origin main
```

**提示**：如果推送失败，可能需要配置 GitHub 凭证。参考 [GitHub 文档](https://docs.github.com/zh/get-started/getting-started-with-git/set-up-git)。

---

## 启用 GitHub Pages

### 步骤 1：进入仓库设置

1. 在 GitHub 仓库页面，点击顶部的 `Settings`（设置）标签
2. 在左侧菜单中找到 `Pages`（在 "Code and automation" 部分下）

### 步骤 2：配置 GitHub Pages

1. 在 "Build and deployment" 部分：
   - **Source**：选择 `GitHub Actions`
   - 这样 GitHub 会自动使用项目中的 `.github/workflows/deploy.yml` 文件进行部署

2. 点击 `Save`（保存）

### 步骤 3：等待部署完成

- GitHub Actions 会自动开始构建和部署
- 你可以在仓库的 `Actions` 标签页查看部署进度
- 首次部署通常需要 2-5 分钟

### 步骤 4：获取网站 URL

部署成功后，你的网站 URL 将是：

```
https://YOUR_USERNAME.github.io/portfolio-website/
```

**注意**：如果仓库名称是 `YOUR_USERNAME.github.io`，则 URL 会是：

```
https://YOUR_USERNAME.github.io/
```

---

## 配置 Netlify Identity

Decap CMS 需要一个认证系统来管理内容。我们使用 Netlify Identity（免费）来实现这个功能。

### 步骤 1：注册 Netlify 账号

1. 访问 [Netlify](https://www.netlify.com/)
2. 点击 `Sign up`（注册）
3. 选择 `Sign up with GitHub`（使用 GitHub 登录）
4. 授权 Netlify 访问你的 GitHub 账号

### 步骤 2：在 Netlify 中连接 GitHub 仓库

1. 登录 Netlify 后，点击 `Add new site` → `Import an existing project`
2. 选择 `Deploy with GitHub`
3. 授权 Netlify 访问你的 GitHub 仓库
4. 选择 `portfolio-website` 仓库
5. 配置构建设置：
   - **Branch to deploy**：`main`
   - **Build command**：`npm run build`
   - **Publish directory**：`out`
6. 点击 `Deploy site`

**注意**：我们主要使用 Netlify 的 Identity 服务，实际网站仍然部署在 GitHub Pages 上。

### 步骤 3：启用 Netlify Identity

1. 在 Netlify 站点控制台，点击顶部的 `Site settings`
2. 在左侧菜单中找到 `Identity`
3. 点击 `Enable Identity` 按钮

### 步骤 4：配置 Identity 设置

1. 在 Identity 页面，点击 `Settings and usage`
2. 找到 `Registration preferences`（注册偏好）：
   - 选择 `Invite only`（仅邀请）
   - 这样只有你邀请的用户才能注册
3. 找到 `External providers`（外部提供商）：
   - 可以启用 GitHub、Google 等第三方登录（可选）
4. 找到 `Services` → `Git Gateway`：
   - 点击 `Enable Git Gateway` 按钮
   - 这样 CMS 就可以通过 Netlify 修改 GitHub 仓库中的内容

### 步骤 5：创建管理员账号

1. 在 Identity 页面，点击 `Invite users` 按钮
2. 输入你的邮箱地址
3. 点击 `Send` 发送邀请邮件
4. 检查你的邮箱，点击邀请链接
5. 设置密码并完成注册

### 步骤 6：更新 CMS 配置

1. 打开 `portfolio-website/public/admin/index.html` 文件
2. 找到以下代码：

```html
<script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
```

3. 确保这行代码存在（项目中已经包含）

4. 打开 `portfolio-website/public/admin/config.yml` 文件
5. 找到 `backend` 配置：

```yaml
backend:
  name: git-gateway
  branch: main
```

6. 确保配置正确（项目中已经配置好）

### 步骤 7：在 GitHub Pages 网站中添加 Netlify Identity

由于我们的网站部署在 GitHub Pages 上，需要在网站中添加 Netlify Identity 脚本。

1. 打开 `portfolio-website/src/app/layout.tsx` 文件
2. 确认 `<head>` 部分包含以下代码（已经包含）：

```tsx
<Script src="https://identity.netlify.com/v1/netlify-identity-widget.js" />
```

3. 如果没有，请添加这行代码

---

## 配置环境变量

### Google Analytics（可选）

如果你想使用 Google Analytics 跟踪访客统计：

#### 步骤 1：获取 Google Analytics 跟踪 ID

1. 访问 [Google Analytics](https://analytics.google.com/)
2. 创建新的 GA4 属性
3. 获取 Measurement ID（格式：`G-XXXXXXXXXX`）

#### 步骤 2：在 GitHub 中添加 Secret

1. 在 GitHub 仓库页面，点击 `Settings` → `Secrets and variables` → `Actions`
2. 点击 `New repository secret` 按钮
3. 添加以下 Secret：
   - **Name**：`GA_ID`
   - **Value**：你的 Google Analytics Measurement ID（例如：`G-XXXXXXXXXX`）
4. 点击 `Add secret`

#### 步骤 3：更新部署配置

GitHub Actions 工作流（`.github/workflows/deploy.yml`）已经配置好读取这个 Secret：

```yaml
env:
  NEXT_PUBLIC_GA_ID: ${{ secrets.GA_ID }}
```

下次部署时，Google Analytics 就会自动启用。

---

## 首次部署

### 自动部署

每次你推送代码到 GitHub 的 `main` 分支时，GitHub Actions 会自动：

1. 安装依赖（`npm ci`）
2. 构建项目（`npm run build`）
3. 部署到 GitHub Pages

### 手动触发部署

如果需要手动触发部署：

1. 在 GitHub 仓库页面，点击 `Actions` 标签
2. 在左侧选择 `Deploy to GitHub Pages` 工作流
3. 点击 `Run workflow` 按钮
4. 选择 `main` 分支
5. 点击 `Run workflow` 确认

### 查看部署状态

1. 在 `Actions` 标签页，可以看到所有部署记录
2. 点击某个部署记录，可以查看详细日志
3. 绿色勾号 ✅ 表示部署成功
4. 红色叉号 ❌ 表示部署失败（查看日志排查问题）

---

## 验证部署

### 步骤 1：访问网站

在浏览器中打开你的 GitHub Pages URL：

```
https://YOUR_USERNAME.github.io/portfolio-website/
```

### 步骤 2：检查首页

- ✅ 个人介绍和头像正常显示
- ✅ 作品分类标签正常显示
- ✅ 联系方式正常显示
- ✅ 配色和样式符合预期

### 步骤 3：测试 CMS 登录

1. 访问 CMS 管理后台：

```
https://YOUR_USERNAME.github.io/portfolio-website/admin/
```

2. 点击 `Login with Netlify Identity` 按钮
3. 使用你创建的管理员账号登录
4. 如果能成功登录并看到 CMS 界面，说明配置成功

### 步骤 4：测试内容编辑

1. 在 CMS 中尝试编辑个人介绍
2. 点击 `Save` 保存
3. 点击 `Publish` 发布
4. 等待 1-2 分钟（GitHub Actions 自动部署）
5. 刷新网站首页，查看修改是否生效

---

## 故障排查

### 问题 1：部署失败（GitHub Actions 报错）

**症状**：在 Actions 标签页看到红色叉号 ❌

**解决方法**：

1. 点击失败的部署记录，查看详细日志
2. 常见错误：
   - **依赖安装失败**：检查 `package.json` 是否正确
   - **构建失败**：检查代码是否有语法错误
   - **权限问题**：确保 GitHub Actions 有写入权限
     - 进入 `Settings` → `Actions` → `General`
     - 在 "Workflow permissions" 中选择 `Read and write permissions`
     - 点击 `Save`

### 问题 2：网站 404 错误

**症状**：访问网站时显示 "404 Page Not Found"

**解决方法**：

1. 检查 GitHub Pages 是否已启用
   - 进入 `Settings` → `Pages`
   - 确认 Source 设置为 `GitHub Actions`
2. 检查部署是否成功
   - 进入 `Actions` 标签页
   - 确认最新的部署有绿色勾号 ✅
3. 检查 URL 是否正确
   - 如果仓库名是 `portfolio-website`，URL 应该包含 `/portfolio-website/`
   - 如果仓库名是 `YOUR_USERNAME.github.io`，URL 不需要包含仓库名

### 问题 3：CMS 无法登录

**症状**：点击登录按钮没有反应，或显示错误

**解决方法**：

1. 检查 Netlify Identity 是否已启用
   - 登录 Netlify
   - 进入站点设置 → Identity
   - 确认 Identity 已启用
2. 检查 Git Gateway 是否已启用
   - 在 Identity 设置中找到 Services → Git Gateway
   - 点击 `Enable Git Gateway`
3. 检查管理员账号是否已创建
   - 在 Identity 页面查看用户列表
   - 如果没有用户，点击 `Invite users` 创建
4. 清除浏览器缓存并重试

### 问题 4：CMS 保存后内容不更新

**症状**：在 CMS 中保存并发布内容，但网站没有更新

**解决方法**：

1. 检查 GitHub 仓库是否有新的提交
   - 在 GitHub 仓库页面查看最近的提交记录
   - CMS 保存后应该会自动创建一个新提交
2. 检查 GitHub Actions 是否自动触发
   - 进入 `Actions` 标签页
   - 应该能看到新的部署任务
3. 等待部署完成
   - 部署通常需要 1-2 分钟
   - 部署完成后刷新网站页面
4. 如果仍然没有更新，尝试手动触发部署
   - 在 `Actions` 标签页点击 `Run workflow`

### 问题 5：图片无法显示

**症状**：网站上的图片显示为空白或 404

**解决方法**：

1. 检查图片路径是否正确
   - 图片应该放在 `public/images/` 目录下
   - 在代码中引用时使用 `/images/filename.jpg`
2. 检查图片文件是否已提交到 GitHub
   - 在 GitHub 仓库中查看 `public/images/` 目录
   - 确认图片文件存在
3. 检查图片文件名
   - 避免使用中文文件名
   - 避免使用空格和特殊字符
   - 推荐使用小写字母和连字符（例如：`my-work-01.jpg`）

### 问题 6：样式显示不正常

**症状**：网站样式混乱，或者没有应用 Tailwind CSS 样式

**解决方法**：

1. 检查 `tailwind.config.js` 配置是否正确
2. 检查 `globals.css` 是否包含 Tailwind 指令：
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```
3. 清除浏览器缓存并刷新页面
4. 检查构建日志是否有 CSS 相关错误

### 问题 7：页面切换动画不流畅

**症状**：页面切换时动画卡顿或不显示

**解决方法**：

1. 检查 Framer Motion 是否正确安装
   ```bash
   npm install framer-motion
   ```
2. 检查浏览器是否支持动画
   - 在旧版浏览器中可能不支持某些动画效果
3. 检查设备性能
   - 在低性能设备上，动画可能会自动禁用

---

## 更新网站内容

### 通过 CMS 更新（推荐）

1. 访问 CMS 管理后台：`https://YOUR_USERNAME.github.io/portfolio-website/admin/`
2. 登录后选择要编辑的内容集合
3. 编辑内容并保存
4. 点击 `Publish` 发布
5. 等待 1-2 分钟，GitHub Actions 会自动部署更新

### 通过代码更新

1. 在本地修改 `content/` 目录下的文件
2. 提交并推送到 GitHub：
   ```bash
   git add .
   git commit -m "Update content"
   git push
   ```
3. GitHub Actions 会自动部署更新

---

## 自定义域名（可选）

如果你想使用自己的域名（例如：`www.yourname.com`）：

### 步骤 1：购买域名

在域名注册商（如 GoDaddy、Namecheap、阿里云等）购买域名。

### 步骤 2：配置 DNS

在域名注册商的 DNS 设置中添加以下记录：

**如果使用 www 子域名**：
- 类型：`CNAME`
- 名称：`www`
- 值：`YOUR_USERNAME.github.io`

**如果使用根域名**：
- 类型：`A`
- 名称：`@`
- 值：添加以下 4 个 IP 地址：
  - `185.199.108.153`
  - `185.199.109.153`
  - `185.199.110.153`
  - `185.199.111.153`

### 步骤 3：在 GitHub 中配置自定义域名

1. 在 GitHub 仓库中创建 `public/CNAME` 文件
2. 文件内容为你的域名（例如：`www.yourname.com`）
3. 提交并推送到 GitHub
4. 在 GitHub 仓库设置中：
   - 进入 `Settings` → `Pages`
   - 在 "Custom domain" 中输入你的域名
   - 勾选 "Enforce HTTPS"
   - 点击 `Save`

### 步骤 4：等待 DNS 生效

DNS 更新通常需要 24-48 小时生效。你可以使用 [DNS Checker](https://dnschecker.org/) 检查 DNS 是否已生效。

---

## 备份和恢复

### 备份

你的所有内容都存储在 GitHub 仓库中，GitHub 会自动备份。如果需要额外备份：

1. 克隆仓库到本地：
   ```bash
   git clone https://github.com/YOUR_USERNAME/portfolio-website.git
   ```
2. 定期拉取最新更新：
   ```bash
   git pull
   ```

### 恢复

如果不小心删除了内容，可以从 GitHub 历史记录中恢复：

1. 在 GitHub 仓库页面，点击某个文件
2. 点击 `History` 查看历史版本
3. 找到需要恢复的版本，点击 `<>` 图标查看文件内容
4. 复制内容并恢复到当前版本

---

## 性能优化建议

### 1. 图片优化

- 使用 WebP 格式（更小的文件大小）
- 压缩图片（推荐使用 [TinyPNG](https://tinypng.com/)）
- 为不同设备提供不同尺寸的图片

### 2. 启用缓存

GitHub Pages 会自动启用缓存，无需额外配置。

### 3. 使用 CDN

如果访问速度较慢，可以考虑使用 CDN 服务（如 Cloudflare）加速。

---

## 安全建议

### 1. 保护 CMS 管理后台

- 使用强密码
- 定期更换密码
- 不要分享管理员账号

### 2. 定期更新依赖

定期运行以下命令更新依赖包：

```bash
npm update
npm audit fix
```

### 3. 监控部署日志

定期检查 GitHub Actions 日志，确保没有异常部署。

---

## 获取帮助

如果遇到问题无法解决，可以：

1. 查看 [GitHub Pages 文档](https://docs.github.com/pages)
2. 查看 [Netlify Identity 文档](https://docs.netlify.com/visitor-access/identity/)
3. 查看 [Decap CMS 文档](https://decapcms.org/docs/)
4. 在 GitHub 仓库中创建 Issue

---

## 总结

恭喜你完成部署！🎉

现在你的个人作品集网站已经成功部署到 GitHub Pages，并且可以通过 CMS 轻松管理内容。

**下一步**：

1. 通过 CMS 上传你的作品
2. 自定义个人介绍和联系方式
3. 分享你的网站链接
4. 定期更新作品集

祝你使用愉快！✨
