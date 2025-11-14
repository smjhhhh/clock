import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

function LandingPage() {
    // 配置你的个人信息
    const config = {
        name: 'Yoru',
        nameHighlight: 'Yoru',
        avatar: '/images/avatar.webp?v=2',  // 头像路径（放到 public/images/ 下）
        title: '全栈开发 / 碎碎念/工具集成',
        quote: '你好，我是一名全栈开发工程师、技术爱好者、 INFP、杀戮尖塔高手',
        buttons: [
            { text: '👋 进入主页', link: '/dashboard', variant: 'pink' },
            { text: '💻 Github', link: 'https://github.com/smjhhhh', variant: 'blue', external: true }
        ]
    };

    // 生成随机 emoji 背景
    const [emojis, setEmojis] = useState([]);

    // 初始化 AOS
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
            easing: 'ease-in-out'
        });
    }, []);

    useEffect(() => {
        const emojiList = [
            // 😀 鬼脸表情大全（超多）
            '😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃', '😉', '😊', '😇', '🥰', '😍', '🤩',
            '😘', '😗', '😚', '😙', '🥲', '😋', '😛', '😜', '🤪', '😝', '🤑', '🤗', '🤭', '🤫', '🤔', '🤐',
            '🤨', '😐', '😑', '😶', '😏', '😒', '🙄', '😬', '🤥', '😌', '😔', '😪', '🤤', '😴', '😷', '🤒',
            '🤕', '🤢', '🤮', '🤧', '🥵', '🥶', '🥴', '😵', '🤯', '🤠', '🥳', '🥸', '😎', '🤓', '🧐', '😕',
            '😟', '🙁', '☹️', '😮', '😯', '😲', '😳', '🥺', '😦', '😧', '😨', '😰', '😥', '😢', '😭', '😱',
            '😖', '😣', '😞', '😓', '😩', '😫', '🥱', '😤', '😡', '😠', '🤬', '😈', '👿', '💀', '☠️', '💩',
            '🤡', '👹', '👺', '👻', '👽', '👾', '🤖',

            // 🎮 游戏娱乐（精简常用）
            '🎮', '🎯', '🎨', '🎭', '🎬', '🎤', '🎧', '🎸', '🎹', '🎲', '🎰', '🕹️',
            '⚽', '🏀', '🏈', '⚾', '🎾', '🏐', '🎱', '🏓', '🏸',

            // 🏆 成就庆祝
            '🏆', '🥇', '🥈', '🥉', '🏅', '🎖️', '🎁', '🎊', '🎉', '🎈', '🎂', '🎄', '🎃',

            // 💻 科技学习（常用）
            '💻', '⌨️', '🖥️', '🖱️', '💾', '💿', '📱', '📲', '☎️', '📺', '🎙️',
            '📚', '📖', '📝', '✏️', '📄', '📊', '📈', '📉', '📆', '📅',

            // ✨ 特效符号
            '✨', '⭐', '🌟', '💫', '🔥', '💥', '⚡', '💨', '🌈', '☀️', '⛅', '☁️', '🌧️', '⛈️', '❄️', '☃️', '🌊', '💧',

            // ❤️ 爱心表情
            '❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔', '❣️', '💕', '💞', '💓', '💗', '💖', '💘', '💝',

            // 🍕 食物（常用）
            '☕', '🍕', '🍔', '🍟', '🌮', '🌯', '🍱', '🍜', '🍝', '🍰', '🎂', '🧁', '🍦', '🍩', '🍪'
        ];

        // 生成多行emoji，每行一排从左向右移动
        const rows = 18; // 18行
        const itemsPerRow = 30; // 每行30个emoji
        const generated = [];

        for (let row = 0; row < rows; row++) {
            const rowEmojis = Array.from({ length: itemsPerRow }, (_, index) => ({
                emoji: emojiList[Math.floor(Math.random() * emojiList.length)],
                id: `${row}-${index}`,
                row: row,
                index: index
            }));
            generated.push(...rowEmojis);
        }

        setEmojis(generated);
    }, []);

    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800">
            {/* Emoji 墙背景 - 多行从左向右，速度交替变化 */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-25">
                <style>{`
                    @keyframes scrollLeft {
                        0% {
                            transform: translateX(0);
                        }
                        100% {
                            transform: translateX(-50%);
                        }
                    }
                    @keyframes float {
                        0%, 100% {
                            transform: translateY(0);
                        }
                        50% {
                            transform: translateY(-20px);
                        }
                    }
                    @keyframes bounce-border {
                        0%, 100% {
                            box-shadow: 0 0 20px rgba(34, 211, 238, 0.6), 0 0 40px rgba(34, 211, 238, 0.3);
                            border-color: #22d3ee;
                        }
                        50% {
                            box-shadow: 0 0 40px rgba(34, 211, 238, 1), 0 0 60px rgba(34, 211, 238, 0.5);
                            border-color: #06b6d4;
                        }
                    }
                    @keyframes shake-hand {
                        0%, 100% {
                            transform: rotate(0deg);
                        }
                        10%, 30%, 50%, 70%, 90% {
                            transform: rotate(14deg);
                        }
                        20%, 40%, 60%, 80% {
                            transform: rotate(-14deg);
                        }
                    }
                    @keyframes scale-in-center {
                        0% {
                            transform: scale(0);
                            opacity: 0;
                        }
                        100% {
                            transform: scale(1);
                            opacity: 1;
                        }
                    }
                    .emoji-row {
                        display: flex;
                        position: absolute;
                        animation: scrollLeft linear infinite;
                        white-space: nowrap;
                    }
                    .emoji-row span {
                        display: inline-block;
                        padding: 0 0.5rem;
                        font-size: 2rem;
                    }
                    .avatar-float {
                        animation: float 3s ease-in-out infinite, bounce-border 2s ease-in-out infinite;
                    }
                    .shake-hand {
                        display: inline-block;
                        animation: shake-hand 2.5s ease-in-out infinite;
                        transform-origin: 70% 70%;
                    }
                    .animate-scale-in-center {
                        animation: scale-in-center 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
                    }
                `}</style>
                {Array.from({ length: 18 }).map((_, rowIndex) => {
                    const rowEmojis = emojis.filter(e => e.row === rowIndex);

                    // 速度交替：奇数行快(25s)，偶数行正常(40s)
                    const duration = rowIndex % 2 === 0 ? 40 : 25;

                    return (
                        <div
                            key={rowIndex}
                            className="emoji-row"
                            style={{
                                top: `${rowIndex * 5.5}%`,
                                animationDuration: `${duration}s`,
                                animationDelay: `${rowIndex * -3}s`
                            }}
                        >
                            {/* 重复两次以实现无缝循环 */}
                            {[...rowEmojis, ...rowEmojis].map((item, idx) => (
                                <span key={`${item.id}-${idx}`}>{item.emoji}</span>
                            ))}
                        </div>
                    );
                })}
            </div>

            {/* 主要内容 */}
            <div className="relative z-10 min-h-screen flex items-center justify-center p-8">
                <div className="text-center animate-scale-in-center">
                    {/* 头像 */}
                    <div className="mb-8 flex justify-center">
                        <div className="avatar-float w-48 h-48 rounded-full overflow-hidden border-4 border-cyan-400 shadow-2xl bg-white">
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
                    <div
                        className="backdrop-blur-xl bg-white/10 rounded-3xl p-12 shadow-2xl border border-white/20 max-w-2xl"
                        data-aos="fade-in"
                        data-aos-duration="1000"
                        data-aos-delay="200"
                    >
                        {/* 标题 */}
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                            <span className="shake-hand">👋</span> 大家好，我是
                            <span className="bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent"> {config.nameHighlight}</span>
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
                                        className={`px-8 py-3 rounded-full font-semibold transition-all hover:scale-105 ${btn.variant === 'pink'
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
                                        className={`px-8 py-3 rounded-full font-semibold transition-all hover:scale-105 ${btn.variant === 'pink'
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
