-- ==========================================
-- Supabase 相册功能数据库初始化脚本
-- ==========================================

-- 1. 创建 photos 表
CREATE TABLE IF NOT EXISTS photos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,

  -- 照片信息
  title TEXT,
  description TEXT,
  image_url TEXT NOT NULL,
  thumbnail_url TEXT,

  -- 隐私控制 🔑
  is_public BOOLEAN DEFAULT false,  -- false=私密, true=公开

  -- 额外信息
  taken_at DATE,
  location TEXT,
  tags TEXT[],
  order_index INTEGER DEFAULT 0,

  -- 时间戳
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. 创建索引以优化查询性能
CREATE INDEX IF NOT EXISTS idx_photos_user ON photos(user_id);
CREATE INDEX IF NOT EXISTS idx_photos_public ON photos(is_public);
CREATE INDEX IF NOT EXISTS idx_photos_created ON photos(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_photos_tags ON photos USING GIN(tags);

-- 3. 启用行级安全 (RLS)
ALTER TABLE photos ENABLE ROW LEVEL SECURITY;

-- 4. 删除旧策略（如果存在）
DROP POLICY IF EXISTS "Public photos viewable by everyone" ON photos;
DROP POLICY IF EXISTS "Users view own photos" ON photos;
DROP POLICY IF EXISTS "Users insert own photos" ON photos;
DROP POLICY IF EXISTS "Users update own photos" ON photos;
DROP POLICY IF EXISTS "Users delete own photos" ON photos;

-- 5. 创建安全策略

-- 策略1: 游客只能查看公开照片
CREATE POLICY "Public photos viewable by everyone"
ON photos FOR SELECT
TO anon
USING (is_public = true);

-- 策略2: 登录用户可以查看所有自己的照片
CREATE POLICY "Users view own photos"
ON photos FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- 策略3: 登录用户可以插入自己的照片
CREATE POLICY "Users insert own photos"
ON photos FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- 策略4: 登录用户可以更新自己的照片（包括公开/私密切换）
CREATE POLICY "Users update own photos"
ON photos FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- 策略5: 登录用户可以删除自己的照片
CREATE POLICY "Users delete own photos"
ON photos FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- 6. 创建自动更新 updated_at 的触发器
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_photos_updated_at ON photos;

CREATE TRIGGER update_photos_updated_at
    BEFORE UPDATE ON photos
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ==========================================
-- 6. 可选：创建管理员白名单
-- ==========================================

-- 创建管理员邮箱列表（只有这些邮箱可以上传和管理照片）
-- CREATE TABLE IF NOT EXISTS admin_users (
--   email TEXT PRIMARY KEY
-- );
--
-- INSERT INTO admin_users (email) VALUES
--   ('your-email@example.com'),    -- 替换为你的邮箱
--   ('your-github-email@users.noreply.github.com');  -- GitHub邮箱
--
-- -- 然后修改 INSERT 策略：
-- DROP POLICY IF EXISTS "Users insert own photos" ON photos;
-- CREATE POLICY "Only admins can insert photos"
-- ON photos FOR INSERT
-- TO authenticated
-- WITH CHECK (
--   auth.uid() = user_id AND
--   auth.jwt()->>'email' IN (SELECT email FROM admin_users)
-- );

-- ==========================================
-- 完成！接下来的步骤：
-- ==========================================
--
-- 1. 在 Supabase Dashboard → Storage 中创建 bucket:
--    - 名称: photos
--    - Public: ✅ 是
--    - File size limit: 10 MB
--    - Allowed MIME types: image/*
--
-- 2. 在 Supabase Dashboard → Authentication → Providers 中启用:
--    - Email (已默认启用)
--    - GitHub OAuth (推荐)
--      需要在 GitHub 创建 OAuth App 并配置回调URL
--
-- 3. 配置环境变量（.env 文件）:
--    VITE_SUPABASE_URL=你的_SUPABASE_URL
--    VITE_SUPABASE_ANON_KEY=你的_ANON_KEY
--
-- ==========================================
