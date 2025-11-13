import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import MatrixRain from '../MatrixRain.jsx';
import { supabase } from '../lib/supabase.js';

function BlogPostPage() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPost();
    }, [id]);

    const fetchPost = async () => {
        try {
            const { data, error } = await supabase
                .from('posts')
                .select('*')
                .eq('id', id)
                .single();

            if (error) throw error;
            setPost(data);
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
                    to="/blog"
                    className="bg-green-900/50 hover:bg-green-800/70 backdrop-blur-lg px-4 py-2 rounded-lg border-2 border-green-700/50 text-green-300 hover:text-green-100 transition-all font-semibold"
                >
                    ← 返回博客列表
                </Link>
            </div>

            {/* 文章内容 */}
            <div className="absolute top-24 left-1/2 -translate-x-1/2 z-10 w-full max-w-4xl px-8 pb-16">
                <div className="bg-black/80 backdrop-blur-lg rounded-lg p-8 shadow-xl">
                    {loading ? (
                        <div className="text-center text-green-300 py-8">
                            <div className="animate-pulse">加载中...</div>
                        </div>
                    ) : !post ? (
                        <div className="text-center text-gray-400 py-8">
                            <p>文章不存在</p>
                        </div>
                    ) : (
                        <article>
                            {/* 标题 */}
                            <h1 className="text-4xl font-bold text-green-400 mb-4">
                                {post.title}
                            </h1>

                            {/* 元信息 */}
                            <div className="flex items-center gap-4 text-gray-400 text-sm mb-6 pb-6 border-b border-green-700/30">
                                <span>📅 {new Date(post.created_at).toLocaleDateString('zh-CN')}</span>
                                {post.author && <span>✍️ {post.author}</span>}
                            </div>

                            {/* 标签 */}
                            {post.tags && post.tags.length > 0 && (
                                <div className="flex gap-2 mb-6 flex-wrap">
                                    {post.tags.map(tag => (
                                        <span
                                            key={tag}
                                            className="text-xs bg-green-800/30 text-green-300 px-3 py-1 rounded-full"
                                        >
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            )}

                            {/* 描述 */}
                            {post.description && (
                                <div className="text-xl text-gray-300 mb-8 italic">
                                    {post.description}
                                </div>
                            )}

                            {/* 正文内容 */}
                            <div className="prose prose-invert prose-green max-w-none">
                                <div
                                    className="text-gray-200 leading-relaxed whitespace-pre-wrap"
                                    dangerouslySetInnerHTML={{ __html: post.content?.replace(/\n/g, '<br>') }}
                                />
                            </div>
                        </article>
                    )}
                </div>
            </div>
        </div>
    );
}

export default BlogPostPage;
