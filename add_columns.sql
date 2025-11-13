-- 给 posts 表添加必需的字段

-- 1. 添加标题字段（必填）
ALTER TABLE public.posts
ADD COLUMN title text NOT NULL DEFAULT '未命名文章';

-- 2. 添加描述字段（可选）
ALTER TABLE public.posts
ADD COLUMN description text;

-- 3. 添加正文内容字段（必填）
ALTER TABLE public.posts
ADD COLUMN content text NOT NULL DEFAULT '';

-- 4. 添加作者字段（可选）
ALTER TABLE public.posts
ADD COLUMN author text;

-- 5. 添加标签数组字段（可选）
ALTER TABLE public.posts
ADD COLUMN tags text[] DEFAULT '{}';

-- 6. 添加发布状态字段（默认为 true）
ALTER TABLE public.posts
ADD COLUMN published boolean DEFAULT true;

-- 7. 插入一篇测试文章
INSERT INTO public.posts (title, description, content, author, tags, published)
VALUES (
  '欢迎来到我的博客',
  '这是第一篇使用 Supabase 后端的文章',
  '# 欢迎！

这是我的第一篇博客文章。

## 功能特性

- 使用 Supabase 作为后端
- React 前端
- Matrix 黑客风格主题

## 技术栈

- React + Vite
- Supabase (PostgreSQL)
- TailwindCSS
- React Router

感谢访问！',
  'smjhhhh',
  ARRAY['开始', '技术', 'React'],
  true
);

-- 查看表结构
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'posts'
ORDER BY ordinal_position;
