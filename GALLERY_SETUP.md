# 📸 相册功能设置指南

## 功能特性

✅ **隐私控制** - 默认私密，可选择性公开照片
✅ **GitHub OAuth 登录** - 快速便捷的认证方式
✅ **拖拽上传** - 支持批量上传照片
✅ **自动压缩** - 上传时自动压缩图片
✅ **灯箱效果** - 全屏查看照片
✅ **懒加载** - 优化加载性能
✅ **响应式设计** - 完美适配移动端

---

## 📋 第一步：设置 Supabase 数据库

### 1.1 创建数据表

1. 登录 [Supabase Dashboard](https://app.supabase.com/)
2. 选择你的项目
3. 点击左侧菜单 **SQL Editor**
4. 点击 **New Query**
5. 复制 `supabase-setup.sql` 文件的全部内容
6. 粘贴到SQL编辑器中
7. 点击 **RUN** 执行

✅ 成功后会创建 `photos` 表及所有安全策略

### 1.2 创建 Storage Bucket

1. 在 Supabase Dashboard 点击 **Storage**
2. 点击 **Create a new bucket**
3. 填写信息：
   ```
   名称: photos
   Public bucket: ✅ 勾选
   File size limit: 10 MB
   Allowed MIME types: image/*
   ```
4. 点击 **Create bucket**

✅ 现在可以存储照片了

---

## 🔐 第二步：配置登录方式

### 方案 A: GitHub OAuth 登录（推荐）

#### 2.1 创建 GitHub OAuth App

1. 访问 https://github.com/settings/developers
2. 点击 **New OAuth App**
3. 填写信息：
   ```
   Application name: Yoru's Gallery
   Homepage URL: https://你的域名.com
   Authorization callback URL: https://你的项目ID.supabase.co/auth/v1/callback
   ```
   > ⚠️ 回调URL在 Supabase → Authentication → URL Configuration 中可以找到
4. 点击 **Register application**
5. 复制 **Client ID** 和生成的 **Client Secret**

#### 2.2 在 Supabase 配置 GitHub Provider

1. 在 Supabase Dashboard 点击 **Authentication**
2. 点击 **Providers**
3. 找到 **GitHub**
4. 启用并填写：
   ```
   Client ID: (从GitHub复制的)
   Client Secret: (从GitHub复制的)
   ```
5. 点击 **Save**

✅ GitHub 登录配置完成！

### 方案 B: 邮箱密码登录（已默认启用）

无需额外配置，已可用。

### 方案 C: Magic Link（无密码登录）

1. 在 Supabase → Authentication → Email Templates
2. 自定义 Magic Link 邮件模板（可选）
3. 已默认启用，无需额外配置

---

## ⚙️ 第三步：配置环境变量

### 3.1 获取 Supabase 凭证

1. 在 Supabase Dashboard 点击 **Settings** → **API**
2. 找到：
   - Project URL
   - Project API keys → `anon` `public`

### 3.2 更新 .env 文件

在项目根目录的 `.env` 文件中添加：

```env
VITE_SUPABASE_URL=https://你的项目ID.supabase.co
VITE_SUPABASE_ANON_KEY=你的anon_key
```

> ⚠️ 确保 `.env` 文件已添加到 `.gitignore`

---

## 🚀 第四步：启动项目

```bash
# 安装依赖（如果还没安装）
npm install

# 启动开发服务器
npm run dev
```

访问 http://localhost:5173/#/gallery

---

## 📖 使用说明

### 游客访问
- 只能看到标记为"公开"的照片
- 无法上传或管理照片

### 登录用户（管理员）
1. 点击 **登录以上传** 按钮
2. 选择登录方式：
   - GitHub OAuth（推荐）
   - 邮箱密码
   - Magic Link

### 上传照片
1. 登录后点击 **+ 上传照片**
2. 拖拽或选择照片
3. 填写标题和描述（可选）
4. **切换公开/私密开关**：
   - 🔒 私密：只有你能看到
   - 🌍 公开：所有人都能看到
5. 点击 **上传**

### 管理照片
- **切换公开/私密**：鼠标悬停在照片上，点击相应按钮
- **删除照片**：鼠标悬停，点击"删除"按钮
- **查看大图**：点击照片即可

---

## 🔒 安全策略说明

### 行级安全 (RLS) 保护

- ✅ 游客**只能查看**公开照片（`is_public = true`）
- ✅ 登录用户可以查看自己的**所有照片**
- ✅ 只有照片所有者可以**更新/删除**照片
- ✅ 数据库级别的安全保护，无法绕过

### 推荐的额外安全措施

1. **限制注册**：
   在 Supabase → Authentication → Settings：
   - 关闭 "Enable email confirmations"（仅信任的邮箱可登录）
   - 设置 "Site URL" 为你的域名

2. **API Rate Limiting**：
   在 Supabase → Settings → API：
   - 启用 Rate limiting

3. **存储策略**：
   确保 photos bucket 的 RLS 策略正确

---

## 🎨 自定义配置

### 修改默认隐私设置

在 `UploadModal.jsx` 中：
```jsx
const [isPublic, setIsPublic] = useState(false); // 改为 true 默认公开
```

### 调整照片网格列数

在 `GalleryPage.jsx` 中：
```jsx
// 当前：4列
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

// 改为3列
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
```

### 修改图片压缩质量

在 `UploadModal.jsx` 的 `uploadPhoto` 函数中：
```jsx
const compressedFile = await imageCompression(file, {
  maxSizeMB: 1,          // 最大1MB，可调整
  maxWidthOrHeight: 1920 // 最大宽高，可调整
});
```

---

## 🐛 常见问题

### 1. 上传失败
- 检查 Storage bucket 是否创建并设为 public
- 检查文件大小是否超过限制
- 查看浏览器控制台错误信息

### 2. 登录后看不到照片
- 检查 RLS 策略是否正确创建
- 确认 photos 表已启用 RLS
- 检查 user_id 是否正确关联

### 3. GitHub 登录失败
- 检查回调URL是否正确
- 确认 Client ID 和 Secret 是否正确
- 查看 Supabase Logs

### 4. 照片显示不出来
- 检查图片URL是否有效
- 确认 bucket 设置为 public
- 检查网络请求是否成功

---

## 📚 技术栈

- **React 18** - UI框架
- **Supabase** - 后端服务（数据库 + 存储 + 认证）
- **Tailwind CSS** - 样式
- **react-dropzone** - 拖拽上传
- **browser-image-compression** - 图片压缩
- **yet-another-react-lightbox** - 灯箱效果
- **react-lazy-load-image-component** - 懒加载

---

## 🆘 获取帮助

- [Supabase 文档](https://supabase.com/docs)
- [Supabase Auth 文档](https://supabase.com/docs/guides/auth)
- [Supabase Storage 文档](https://supabase.com/docs/guides/storage)
- [GitHub Issues](https://github.com/smjhhhh/clock/issues)

---

**🎉 设置完成！享受你的私密相册吧！**
