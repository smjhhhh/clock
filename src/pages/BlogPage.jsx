import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MatrixRain from '../MatrixRain.jsx';
import { supabase } from '../lib/supabase.js';

function BlogPage() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const { data, error } = await supabase
                .from('posts')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setPosts(data || []);
        } catch (error) {
            console.error('获取文章失败:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen relative text-green-400">
            {/* Matrix 数字雨背景 */}
            <MatrixRain />

            {/* 返回按钮 - 左上角 */}
            <div className="absolute top-8 left-8 z-10">
                <Link
                    to="/"
                    className="bg-green-900/50 hover:bg-green-800/70 backdrop-blur-lg px-4 py-2 rounded-lg border-2 border-green-700/50 text-green-300 hover:text-green-100 transition-all font-semibold"
                >
                    ← 返回主页
                </Link>
            </div>

            {/* 博客内容 */}
            <div className="absolute top-24 left-1/2 -translate-x-1/2 z-10 w-full max-w-4xl px-8">
                <div className="bg-black/80 backdrop-blur-lg rounded-lg p-8 shadow-xl">
                    <h1 className="text-4xl font-bold text-green-400 mb-8">📝 博客文章</h1>

                    {loading ? (
                        <div className="text-center text-green-300 py-8">
                            <div className="animate-pulse">加载中...</div>
                        </div>
                    ) : posts.length === 0 ? (
                        <div className="text-center text-gray-400 py-8">
                            <p>还没有文章，去 Supabase 后台添加第一篇文章吧！</p>
                            <p className="text-sm mt-2">表名: posts</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {posts.map(post => (
                                <Link
                                    key={post.id}
                                    to={`/blog/${post.id}`}
                                    className="block bg-green-900/20 hover:bg-green-800/30 rounded-lg p-6 border border-green-700/30 transition-all"
                                >
                                    <h2 className="text-2xl font-bold text-green-300 mb-2">
                                        {post.title}
                                    </h2>
                                    <p className="text-gray-400 text-sm mb-3">
                                        📅 {new Date(post.created_at).toLocaleDateString('zh-CN')}
                                    </p>
                                    {post.description && (
                                        <p className="text-gray-300">
                                            {post.description}
                                        </p>
                                    )}
                                    {post.tags && post.tags.length > 0 && (
                                        <div className="flex gap-2 mt-3 flex-wrap">
                                            {post.tags.map(tag => (
                                                <span
                                                    key={tag}
                                                    className="text-xs bg-green-800/30 text-green-300 px-2 py-1 rounded"
                                                >
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default BlogPage;
