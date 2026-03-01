/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // 配色方案
      colors: {
        primary: '#1b1b1b',      // 主色：深黑色
        secondary: '#fffbee',    // 辅色：米白色
        accent: '#ffffff',       // 点缀色：纯白色
      },
      // 圆角样式
      borderRadius: {
        'soft': '12px',          // 适度圆角（按钮、标签）
        'card': '16px',          // 卡片圆角（作品卡片）
      },
      // 边框宽度（细线条）
      borderWidth: {
        'thin': '1px',           // 细线条装饰
      },
    },
  },
  plugins: [],
}
