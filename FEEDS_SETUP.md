# 订阅中心配置指南

## 📡 如何添加你的订阅源

打开 `src/components/FeedsWidget.jsx`，找到 `FEED_SOURCES` 配置数组，添加你关注的创作者。

---

## 📺 Bilibili UP主

### 1. 获取 UP 主的 UID

访问 UP 主主页，URL 格式为：`https://space.bilibili.com/UID`

例如：`https://space.bilibili.com/123456` 中的 `123456` 就是 UID

### 2. 添加到配置

```javascript
const FEED_SOURCES = [
    {
        name: 'UP主昵称',
        url: 'https://rsshub.app/bilibili/user/video/123456',
        platform: 'bilibili'
    },
];
```

### 示例：

```javascript
{
    name: '老番茄',
    url: 'https://rsshub.app/bilibili/user/video/525033',
    platform: 'bilibili'
},
{
    name: 'Lex Fridman',
    url: 'https://rsshub.app/bilibili/user/video/44930119',
    platform: 'bilibili'
},
```

---

## 🎬 YouTube 频道

### 1. 获取频道 ID

**方法一**：访问频道主页，URL 中的 ID
- 格式：`https://www.youtube.com/channel/CHANNEL_ID`
- 或：`https://www.youtube.com/@USERNAME` → 点击"关于"页面查看频道 ID

**方法二**：查看频道页面源代码
- 右键 → 查看页面源代码 → 搜索 `channelId`

### 2. 添加到配置

```javascript
const FEED_SOURCES = [
    {
        name: '频道名称',
        url: 'https://www.youtube.com/feeds/videos.xml?channel_id=CHANNEL_ID',
        platform: 'youtube'
    },
];
```

### 示例：

```javascript
{
    name: 'Fireship',
    url: 'https://www.youtube.com/feeds/videos.xml?channel_id=UCsBjURrPoezykLs9EqgamOA',
    platform: 'youtube'
},
{
    name: 'Veritasium',
    url: 'https://www.youtube.com/feeds/videos.xml?channel_id=UCHnyfMqiRRG1u-2MsSQLbXA',
    platform: 'youtube'
},
```

---

## 🐦 Twitter / X

### 1. 获取用户名

Twitter 用户名就是 @后面的部分

例如：`https://twitter.com/elonmusk` → 用户名是 `elonmusk`

### 2. 添加到配置

```javascript
const FEED_SOURCES = [
    {
        name: '推主名字',
        url: 'https://rsshub.app/twitter/user/USERNAME',
        platform: 'twitter'
    },
];
```

### 示例：

```javascript
{
    name: 'Elon Musk',
    url: 'https://rsshub.app/twitter/user/elonmusk',
    platform: 'twitter'
},
{
    name: 'Naval',
    url: 'https://rsshub.app/twitter/user/naval',
    platform: 'twitter'
},
```

⚠️ **注意**：Twitter 订阅可能不稳定，因为 Twitter 的 API 限制。

---

## 📋 完整配置示例

```javascript
const FEED_SOURCES = [
    // Bilibili
    {
        name: '老番茄',
        url: 'https://rsshub.app/bilibili/user/video/525033',
        platform: 'bilibili'
    },

    // YouTube
    {
        name: 'Fireship',
        url: 'https://www.youtube.com/feeds/videos.xml?channel_id=UCsBjURrPoezykLs9EqgamOA',
        platform: 'youtube'
    },

    // Twitter
    {
        name: 'Naval',
        url: 'https://rsshub.app/twitter/user/naval',
        platform: 'twitter'
    },
];
```

---

## 🔧 高级配置

### RSSHub 公共实例

默认使用 `rsshub.app`，如果不稳定可以换成其他公共实例：

- `https://rsshub.rssforever.com`
- `https://rss.shab.fun`

只需替换 URL 中的域名即可。

### 自部署 RSSHub

如果你有服务器，可以自己部署 RSSHub：

```bash
docker run -d --name rsshub -p 1200:1200 diygod/rsshub
```

然后使用 `http://你的服务器:1200` 作为 RSS 源。

---

## 📱 功能说明

- ⏱️ **自动更新**：每10分钟自动刷新
- 🔄 **手动刷新**：点击右上角的刷新按钮
- 📊 **显示最新5条**：只显示最新的5条更新
- 🕒 **时间显示**：智能显示"刚刚"、"X分钟前"等

---

## 🐛 故障排查

### 1. 显示"未配置订阅源"

检查 `FEED_SOURCES` 数组是否为空。

### 2. 显示"获取失败"

- 检查网络连接
- 尝试更换 RSSHub 实例
- 查看浏览器控制台的错误信息

### 3. Bilibili/Twitter 订阅无法加载

- RSSHub 公共实例可能被限流
- 尝试换一个公共实例
- 或自己部署 RSSHub

---

## 🔗 相关链接

- RSSHub 官网：https://docs.rsshub.app/
- RSSHub GitHub：https://github.com/DIYgod/RSSHub
- 所有支持的路由：https://docs.rsshub.app/routes/social-media

需要帮助吗？打开浏览器控制台（F12）查看详细错误信息！
