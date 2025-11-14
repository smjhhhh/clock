import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function LandingPage() {
    // 配置你的个人信息
    const config = {
        name: 'David',
        nameHighlight: 'David',
        avatar: '/images/avatar.jpg',  // 头像路径（放到 public/images/ 下）
        title: '全栈开发 / 技术博客',
        quote: '你好，我是 David，一名全栈开发工程师、技术爱好者、终身学习者',
        buttons: [
            { text: '👋 进入主页', link: '/dashboard', variant: 'pink' },
            { text: '💻 Github', link: 'https://github.com/smjhhhh', variant: 'blue', external: true }
        ]
    };

    // 生成随机 emoji 背景
    const [emojis, setEmojis] = useState([]);

    useEffect(() => {
        const emojiList = [
            '🎮', '🎯', '🎨', '🎭', '🎪', '🎬', '🎤', '🎧', '🎼', '🎹', '🎸', '🎺', '🎻',
            '🎲', '🎰', '🎳', '🏀', '⚽', '🏈', '⚾', '🎾', '🏐', '🏉', '🎱', '🏓', '🏸',
            '🥊', '🥋', '🥅', '⛳', '⛸️', '🎣', '🎿', '🛷', '🥌', '🏹', '🎯', '🪀', '🪁',
            '🛹', '🛼', '🛴', '🏆', '🥇', '🥈', '🥉', '🏅', '🎖️', '🎗️', '🏵️', '🎀', '🎁',
            '💝', '🎉', '🎊', '🎈', '🎂', '🎄', '🎃', '🎍', '🎋', '🎏', '🎐', '🎑', '🧧',
            '🎎', '🎟️', '🎫', '🎭', '🖼️', '🎨', '🧵', '🧶', '🪡', '🪢', '👓', '🕶️', '🥽',
            '🥼', '🦺', '👔', '👕', '👖', '🧣', '🧤', '🧥', '🧦', '👗', '👘', '🥻', '🩱',
            '🩲', '🩳', '👙', '👚', '👛', '👜', '👝', '🛍️', '🎒', '🩴', '👞', '👟', '🥾',
            '🥿', '👠', '👡', '🩰', '👢', '👑', '👒', '🎩', '🎓', '🧢', '⛑️', '🪖', '💄',
            '💍', '💼', '🌂', '☂️', '🎃', '🎄', '🎆', '🎇', '🧨', '✨', '🎈', '🎉', '🎊',
            '🎋', '🎍', '🎎', '🎏', '🎐', '🎑', '🧧', '🎀', '🎁', '🎗️', '🎟️', '🎫', '🎖️',
            '🏆', '🏅', '🥇', '🥈', '🥉', '⚽', '⚾', '🥎', '🏀', '🏐', '🏈', '🏉', '🎾',
            '🥏', '🎳', '🏏', '🏑', '🏒', '🥍', '🏓', '🏸', '🥊', '🥋', '🥅', '⛳', '⛸️',
            '🎣', '🤿', '🎽', '🎿', '🛷', '🥌', '🎯', '🪀', '🪁', '🎱', '🔮', '🪄', '🧿',
            '🎮', '🕹️', '🎰', '🎲', '🧩', '🧸', '🪅', '🪆', '♠️', '♥️', '♦️', '♣️', '♟️'
        ];

        // 生成大量随机 emoji
        const generated = Array.from({ length: 400 }, () => ({
            emoji: emojiList[Math.floor(Math.random() * emojiList.length)],
            id: Math.random()
        }));

        setEmojis(generated);
    }, []);

    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800">
            {/* Emoji 墙背景 */}
            <div className="absolute inset-0 opacity-30">
                <div className="grid grid-cols-20 gap-4 p-8">
                    {emojis.map((item) => (
                        <div key={item.id} className="text-2xl opacity-50">
                            {item.emoji}
                        </div>
                    ))}
                </div>
            </div>

            {/* 主要内容 */}
            <div className="relative z-10 min-h-screen flex items-center justify-center p-8">
                <div className="text-center">
                    {/* 头像 */}
                    <div className="mb-8 flex justify-center">
                        <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-white/30 shadow-2xl bg-white">
                            <img
                                src={config.avatar}
                                alt="Avatar"
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    // 如果头像加载失败，显示默认占位符
                                    e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23ddd" width="200" height="200"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-size="60"%3E👤%3C/text%3E%3C/svg%3E';
                                }}
                            />
                        </div>
                    </div>

                    {/* 玻璃态卡片 */}
                    <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-12 shadow-2xl border border-white/20 max-w-2xl">
                        {/* 标题 */}
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                            👋 大家好，我是
                            <span className="text-pink-400"> {config.nameHighlight}</span>
                        </h1>

                        {/* 副标题 */}
                        <p className="text-xl text-gray-200 mb-6">
                            {config.title}
                        </p>

                        {/* 引用 */}
                        <p className="text-gray-300 mb-8 italic">
                            "{config.quote}"
                        </p>

                        {/* 按钮组 */}
                        <div className="flex gap-4 justify-center flex-wrap">
                            {config.buttons.map((btn, idx) => (
                                btn.external ? (
                                    <a
                                        key={idx}
                                        href={btn.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`px-8 py-3 rounded-full font-semibold transition-all hover:scale-105 ${
                                            btn.variant === 'pink'
                                                ? 'bg-white/10 border-2 border-pink-400 text-pink-400 hover:bg-pink-400/20'
                                                : 'bg-white/10 border-2 border-blue-400 text-blue-400 hover:bg-blue-400/20'
                                        }`}
                                    >
                                        {btn.text}
                                    </a>
                                ) : (
                                    <Link
                                        key={idx}
                                        to={btn.link}
                                        className={`px-8 py-3 rounded-full font-semibold transition-all hover:scale-105 ${
                                            btn.variant === 'pink'
                                                ? 'bg-white/10 border-2 border-pink-400 text-pink-400 hover:bg-pink-400/20'
                                                : 'bg-white/10 border-2 border-blue-400 text-blue-400 hover:bg-blue-400/20'
                                        }`}
                                    >
                                        {btn.text}
                                    </Link>
                                )
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;
