# Supabase 博客后端设置指南

## 第一步：创建 Supabase 项目

1. 访问 https://supabase.com
2. 点击 "Start your project" 注册/登录（可以用 GitHub 账号）
3. 创建新项目：
   - Organization: 选择或创建
   - Project name: `clock-blog`（或你喜欢的名字）
   - Database Password: 设置一个强密码（保存好）
   - Region: 选择 `Northeast Asia (Tokyo)` （离中国最近）
4. 点击 "Create new project"，等待1-2分钟初始化

---

## 第二步：创建数据库表

1. 在左侧菜单选择 **Table Editor**
2. 点击 **"New table"** 按钮
3. 填写表信息：

**表名：** `posts`

**字段配置：**

| 字段名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| id | uuid | gen_random_uuid() | 主键，自动生成 ✅ |
| created_at | timestamptz | now() | 创建时间，自动生成 ✅ |
| title | text | - | 文章标题 ⭐必填 |
| description | text | - | 文章描述 |
| content | text | - | 文章正文 ⭐必填 |
| author | text | - | 作者 |
| tags | text[] | - | 标签数组 |
| published | boolean | true | 是否发布 |

4. 点击 **"Save"** 创建表

---

## 第三步：添加测试文章

1. 在 Table Editor 中，选择 `posts` 表
2. 点击 **"Insert row"** 按钮
3. 填写：
   ```
   title: 我的第一篇博客
   description: 这是使用 Supabase 写的第一篇文章
   content: 欢迎来到我的博客！这是正文内容。

你可以写很长的内容，支持多行。

# 支持 Markdown 格式
- 列表项1
- 列表项2

**粗体文字**
   author: 你的名字
   tags: ["开始", "测试"]
   published: true
   ```
4. 点击 **"Save"**

---

## 第四步：获取 API 密钥

1. 在左侧菜单选择 **Settings** (齿轮图标)
2. 选择 **API** 标签页
3. 找到以下信息：
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon/public key**: `eyJhbGci...`（很长的一串）

4. 复制这两个值

---

## 第五步：配置本地环境

1. 在项目根目录创建 `.env` 文件：

```bash
# 复制 .env.example 并重命名为 .env
cp .env.example .env
```

2. 编辑 `.env` 文件，填入你的密钥：

```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGci...你的密钥...
```

3. **重启开发服务器**：
```bash
# 先停止当前的 npm run dev (Ctrl+C)
# 然后重新启动
npm run dev
```

---

## 第六步：测试博客功能

1. 访问 http://localhost:5175/#/blog
2. 应该能看到你刚才创建的测试文章
3. 点击文章标题查看详情

---

## 数据库 SQL 参考（可选）

如果你想用 SQL 创建表，可以在 **SQL Editor** 中运行：

```sql
-- 创建 posts 表
create table posts (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  description text,
  content text not null,
  author text,
  tags text[],
  published boolean default true
);

-- 插入测试数据
insert into posts (title, description, content, author, tags)
values (
  '我的第一篇博客',
  '这是使用 Supabase 写的第一篇文章',
  '欢迎来到我的博客！这是正文内容。',
  'smjhhhh',
  array['开始', '测试']
);
```

---

## 常见问题

### 1. 看不到文章？
- 检查 `.env` 文件配置是否正确
- 确保重启了开发服务器
- 打开浏览器控制台（F12）查看错误信息

### 2. CORS 错误？
- Supabase 默认允许所有域名访问
- 如果需要限制，在 Settings → API → CORS 中配置

### 3. 如何添加更多文章？
- 方法1：在 Supabase Table Editor 中手动添加
- 方法2：后续可以创建管理后台界面

### 4. 如何在生产环境使用？
1. 在 Vercel/Netlify 部署时设置环境变量
2. 添加环境变量 `VITE_SUPABASE_URL` 和 `VITE_SUPABASE_ANON_KEY`

---

## 下一步扩展

已完成的功能：
- ✅ 文章列表
- ✅ 文章详情
- ✅ 标签显示
- ✅ 日期排序

可以添加的功能：
- [ ] 搜索文章
- [ ] 按标签筛选
- [ ] 评论系统（需要添加 comments 表）
- [ ] Markdown 渲染（需要安装 react-markdown）
- [ ] 文章编辑界面（需要添加用户认证）
- [ ] 图片上传（Supabase Storage）

需要帮助实现这些功能吗？告诉我！
