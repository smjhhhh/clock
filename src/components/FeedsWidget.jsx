import { useState, useEffect } from 'react';

function FeedsWidget() {
    const [feeds, setFeeds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 配置你关注的订阅源
    const FEED_SOURCES = [
        // Bilibili UP主 示例（替换为你关注的 UID）
        // { name: 'UP主名字', url: 'https://rsshub.app/bilibili/user/video/UID', platform: 'bilibili' },

        // YouTube 频道示例（替换为频道 ID）
        // { name: '频道名字', url: 'https://www.youtube.com/feeds/videos.xml?channel_id=CHANNEL_ID', platform: 'youtube' },

        // Twitter 用户示例（需要 RSSHub）
        // { name: '推主名字', url: 'https://rsshub.app/twitter/user/USERNAME', platform: 'twitter' },
    ];

    useEffect(() => {
        if (FEED_SOURCES.length === 0) {
            setLoading(false);
            return;
        }
        fetchAllFeeds();
        // 每10分钟刷新一次
        const interval = setInterval(fetchAllFeeds, 10 * 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    const fetchAllFeeds = async () => {
        try {
            setLoading(true);
            const allItems = [];

            // 使用 CORS 代理来获取 RSS
            const corsProxy = 'https://api.allorigins.win/raw?url=';

            for (const source of FEED_SOURCES) {
                try {
                    const response = await fetch(corsProxy + encodeURIComponent(source.url));
                    const text = await response.text();
                    const parser = new DOMParser();
                    const xml = parser.parseFromString(text, 'text/xml');

                    // 解析 RSS/Atom feed
                    const items = Array.from(xml.querySelectorAll('entry, item')).slice(0, 3);

                    items.forEach(item => {
                        const title = item.querySelector('title')?.textContent;
                        const link = item.querySelector('link')?.getAttribute('href') ||
                                   item.querySelector('link')?.textContent;
                        const pubDate = item.querySelector('published, pubDate')?.textContent;

                        if (title && link) {
                            allItems.push({
                                title,
                                link,
                                pubDate: new Date(pubDate),
                                platform: source.platform,
                                author: source.name
                            });
                        }
                    });
                } catch (err) {
                    console.error(`获取 ${source.name} 失败:`, err);
                }
            }

            // 按时间排序
            allItems.sort((a, b) => b.pubDate - a.pubDate);

            setFeeds(allItems.slice(0, 5)); // 只显示最新5条
            setError(null);
        } catch (err) {
            console.error('获取订阅失败:', err);
            setError('获取失败');
        } finally {
            setLoading(false);
        }
    };

    const getPlatformIcon = (platform) => {
        const icons = {
            bilibili: '📺',
            youtube: '🎬',
            twitter: '🐦'
        };
        return icons[platform] || '📰';
    };

    const getTimeAgo = (date) => {
        const now = new Date();
        const diff = Math.floor((now - date) / 1000); // 秒

        if (diff < 60) return '刚刚';
        if (diff < 3600) return `${Math.floor(diff / 60)}分钟前`;
        if (diff < 86400) return `${Math.floor(diff / 3600)}小时前`;
        if (diff < 604800) return `${Math.floor(diff / 86400)}天前`;
        return date.toLocaleDateString('zh-CN');
    };

    if (FEED_SOURCES.length === 0) {
        return (
            <div className="bg-sky-100 dark:bg-sky-900 backdrop-blur-lg rounded-lg p-3 shadow-2xl border-2 border-sky-300 dark:border-sky-700">
                <h3 className="text-gray-800 dark:text-gray-200 font-bold text-xs mb-2 font-mono">📡 订阅中心</h3>
                <div className="text-gray-600 dark:text-gray-400 text-xs font-mono text-center py-4">
                    <div className="mb-2">未配置订阅源</div>
                    <div className="text-[10px] text-gray-600 dark:text-gray-400">
                        编辑 FeedsWidget.jsx 添加订阅
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-sky-100 dark:bg-sky-900 backdrop-blur-lg rounded-lg p-3 shadow-2xl border-2 border-sky-300 dark:border-sky-700">
            <div className="flex items-center justify-between mb-2">
                <h3 className="text-gray-800 dark:text-gray-200 font-bold text-xs font-mono">📡 订阅中心</h3>
                {!loading && (
                    <button
                        onClick={fetchAllFeeds}
                        className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white text-xs"
                        title="刷新"
                    >
                        🔄
                    </button>
                )}
            </div>

            {loading && feeds.length === 0 ? (
                <div className="text-gray-600 dark:text-gray-400 text-xs font-mono text-center py-2">
                    加载中...
                </div>
            ) : error ? (
                <div className="text-gray-700 dark:text-gray-300 text-xs font-mono text-center py-2">
                    {error}
                </div>
            ) : feeds.length === 0 ? (
                <div className="text-gray-600 dark:text-gray-400 text-xs font-mono text-center py-2">
                    暂无更新
                </div>
            ) : (
                <div className="space-y-2">
                    {feeds.map((feed, idx) => (
                        <a
                            key={idx}
                            href={feed.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block bg-white/50 dark:bg-sky-800/50 hover:bg-white/70 dark:hover:bg-sky-800/70 rounded p-2 border border-sky-300 dark:border-sky-700 transition-all"
                        >
                            <div className="flex items-start gap-2">
                                <span className="text-base flex-shrink-0 mt-0.5">
                                    {getPlatformIcon(feed.platform)}
                                </span>
                                <div className="flex-1 min-w-0">
                                    <div className="text-gray-800 dark:text-gray-200 text-xs font-mono line-clamp-2 mb-1">
                                        {feed.title}
                                    </div>
                                    <div className="flex items-center gap-2 text-[10px] text-gray-600 dark:text-gray-400">
                                        <span>{feed.author}</span>
                                        <span>•</span>
                                        <span>{getTimeAgo(feed.pubDate)}</span>
                                    </div>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            )}

            <div className="mt-2 pt-2 border-t border-sky-300 dark:border-sky-700">
                <div className="text-gray-600 dark:text-gray-400 text-[10px] font-mono text-center">
                    每10分钟自动更新
                </div>
            </div>
        </div>
    );
}

export default FeedsWidget;
