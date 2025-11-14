# Landing Page 配置指南

## 🎨 你的个人 Landing Page 已创建！

访问：http://localhost:5173/clock/#/

## 📝 如何自定义

打开 `src/pages/LandingPage.jsx`，找到第 6-17 行的 `config` 对象：

```javascript
const config = {
    name: '你的名字',              // 修改为你的名字
    nameHighlight: '名字',         // 高亮部分（粉色显示）
    avatar: '/images/avatar.jpg',  // 头像路径
    title: '技术博客 / 全栈开发',  // 你的标题/职位
    quote: '你可以叫我苏，我是一名软件工程师、终身学习者、梦想家', // 个性签名
    buttons: [
        { text: '👋 欢迎', link: '/dashboard', variant: 'pink' },
        { text: '💻 Github', link: 'https://github.com/yourusername', variant: 'blue', external: true }
    ]
};
```

## 🖼️ 添加头像

1. 把你的头像图片放到 `public/images/` 文件夹
2. 命名为 `avatar.jpg`（或其他名字）
3. 更新 `config.avatar` 路径

支持的格式：jpg、png、gif、webp

## 🎨 设计特点

- ✨ **Emoji 墙背景** - 400+ 随机 emoji
- 🪟 **Glassmorphism** - 玻璃态毛玻璃效果
- 🌈 **渐变背景** - 深蓝色渐变
- 💫 **Hover 动画** - 按钮悬停放大效果
- 📱 **响应式设计** - 自适应移动端

## 🔗 路由说明

- `/` - Landing Page（首页）
- `/dashboard` - Dashboard（原来的主页，包含所有组件）
- `/blog` - 博客
- `/heatmap` - 市场热力图
- `/ai` - AI 聊天

## 🎯 自定义按钮

你可以添加任意数量的按钮：

```javascript
buttons: [
    // 内部链接
    {
        text: '👋 欢迎',
        link: '/dashboard',
        variant: 'pink'  // 'pink' 或 'blue'
    },

    // 外部链接
    {
        text: '💻 Github',
        link: 'https://github.com/yourusername',
        variant: 'blue',
        external: true  // 必须设置为 true
    },
]
```

## 🎨 颜色主题

当前配色：
- 背景：深蓝渐变 (`from-slate-800 via-slate-900 to-slate-800`)
- 强调色：粉色 (`text-pink-400`)
- 次要色：蓝色 (`text-blue-400`)
- 卡片：半透明白色 (`bg-white/10`)

### 修改颜色

在 `LandingPage.jsx` 中搜索对应的 Tailwind 类名修改：

**背景渐变**：
```jsx
<div className="bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
```

**强调色**：
```jsx
<span className="text-rose-400"> {config.nameHighlight}</span>
```

**按钮颜色**：
```jsx
border-rose-400 text-rose-400 hover:bg-rose-400/20
```

## 💡 常用颜色方案

### 科技蓝
- 背景：`from-blue-900 via-indigo-900 to-purple-900`
- 强调：`text-cyan-400`

### 温暖橙
- 背景：`from-orange-900 via-red-900 to-pink-900`
- 强调：`text-yellow-400`

### 清新绿
- 背景：`from-emerald-900 via-teal-900 to-cyan-900`
- 强调：`text-lime-400`

### 紫色梦幻
- 背景：`from-purple-900 via-fuchsia-900 to-pink-900`
- 强调：`text-purple-300`

## 🐛 故障排查

### 头像不显示
1. 确认图片在 `public/images/` 文件夹
2. 检查路径是否正确（以 `/` 开头）
3. 检查文件扩展名（.jpg, .png 等）

### Emoji 背景不显示
Emoji 墙会自动生成，如果看不到可能是：
1. 透明度太低 - 修改 `opacity-30` 为更大的值
2. 被卡片遮挡 - 检查 z-index

### 按钮链接不工作
- 内部链接：确保 `external: false` 或不设置
- 外部链接：必须设置 `external: true`

## 🚀 下一步

现在你可以：
1. 准备一张头像图片
2. 告诉我你的个人信息
3. 我帮你配置完整！

或者你也可以自己修改 `src/pages/LandingPage.jsx` 中的配置。
