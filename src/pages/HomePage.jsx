import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Countdown from '../Countdown.jsx';
import GoldChart from '../components/GoldChart.jsx';
import WeatherWidget from '../components/WeatherWidget.jsx';
import FloatingAI from '../components/FloatingAI.jsx';
import WorldClock from '../components/WorldClock.jsx';
import FloatingGame from '../components/FloatingGame.jsx';
import ExchangeRate from '../components/ExchangeRate.jsx';
import WorldMap from '../components/WorldMap.jsx';
import FeedsWidget from '../components/FeedsWidget.jsx';
import PhotoFrame from '../components/PhotoFrame.jsx';
import { FaReact, FaVuejs, FaNodeJs, FaPython, FaDocker, FaGitAlt } from 'react-icons/fa';
import { SiTypescript, SiTailwindcss } from 'react-icons/si';

function HomePage() {
    const [darkMode, setDarkMode] = useState(false);
    const [language, setLanguage] = useState('zh'); // 'zh', 'en', 'jp'

    // 初始化 AOS
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
            easing: 'ease-out'
        });
    }, []);

    // 多语言文本
    const translations = {
        zh: {
            greeting: '你好，我是 Yoru，来自上海，很高兴认识你 👋',
            dream: '🌟 Dream to be a full-stack developer.',
            skills: '前端开发 / 产品设计 / 模型调参 / agent 开发',
            studentTitle: '🎓 我是一名软件工程专业的学生。',
            aboutMe: {
                coding: 'Love coding and open source.',
                birthday: '2002.9.26 born in Shanghai.',
                learning: 'Passionate learner, always growing'
            },
            techStack: '技术栈',
            interests: 'Interests',
            interestsList: [
                { name: 'Traveling', icon: '✈️' },
                { name: 'Music', icon: '🎵' },
                { name: 'Photography', icon: '📷' },
                { name: 'Coding', icon: '💻' }
            ],
            contact: 'Contact',
            toolbox: "Yoru's 工具箱",
            countdown: '倒计时',
            weather: '天气',
            worldClock: '工作时间',
            goldPrice: '黄金价格',
            exchangeRate: '汇率',
            worldMap: '世界地图',
            feeds: '订阅中心',
            marketHeatmap: '市场热力图',
            marketHeatmapDesc: '查看实时市场数据',
            techBlog: '技术博客',
            techBlogDesc: '分享学习与思考',
            nav: {
                about: '关于',
                tools: '工具',
                blog: '博客',
                market: '市场'
            }
        },
        en: {
            greeting: 'Hi, I\'m Yoru from Shanghai, nice to meet you 👋',
            dream: '🌟 Dream to be a full-stack developer.',
            skills: 'Frontend Dev / Product Design / Model Training / Agent Development',
            studentTitle: '🎓 I am a software engineering student.',
            aboutMe: {
                coding: 'Love coding and open source.',
                birthday: 'Born on September 26, 2002 in Shanghai.',
                learning: 'Passionate learner, always growing'
            },
            techStack: 'Tech Stack',
            interests: 'Interests',
            interestsList: [
                { name: 'Traveling', icon: '✈️' },
                { name: 'Music', icon: '🎵' },
                { name: 'Photography', icon: '📷' },
                { name: 'Coding', icon: '💻' }
            ],
            contact: 'Contact',
            toolbox: "Yoru's Toolbox",
            countdown: 'Countdown',
            weather: 'Weather',
            worldClock: 'World Clock',
            goldPrice: 'Gold Price',
            exchangeRate: 'Exchange Rate',
            worldMap: 'World Map',
            feeds: 'RSS Feeds',
            marketHeatmap: 'Market Heatmap',
            marketHeatmapDesc: 'View real-time market data',
            techBlog: 'Tech Blog',
            techBlogDesc: 'Share learning and thoughts',
            nav: {
                about: 'About',
                tools: 'Tools',
                blog: 'Blog',
                market: 'Market'
            }
        },
        jp: {
            greeting: 'こんにちは、私は上海出身のYoruです、よろしくお願いします 👋',
            dream: '🌟 フルスタック開発者になることを夢見ています。',
            skills: 'フロントエンド開発 / プロダクトデザイン / モデル訓練 / エージェント開発',
            studentTitle: '🎓 ソフトウェアエンジニアリングを専攻している学生です。',
            aboutMe: {
                coding: 'コーディングとオープンソースが大好きです。',
                birthday: '2002年9月26日、上海生まれ。',
                learning: '情熱的な学習者、常に成長中'
            },
            techStack: '技術スタック',
            interests: '趣味',
            interestsList: [
                { name: '旅行', icon: '✈️' },
                { name: '音楽', icon: '🎵' },
                { name: '写真', icon: '📷' },
                { name: 'コーディング', icon: '💻' }
            ],
            contact: '連絡先',
            toolbox: "Yoru's ツールボックス",
            countdown: 'カウントダウン',
            weather: '天気',
            worldClock: '世界時計',
            goldPrice: '金価格',
            exchangeRate: '為替レート',
            worldMap: '世界地図',
            feeds: 'RSSフィード',
            marketHeatmap: 'マーケットヒートマップ',
            marketHeatmapDesc: 'リアルタイム市場データを表示',
            techBlog: '技術ブログ',
            techBlogDesc: '学習と思考を共有',
            nav: {
                about: 'について',
                tools: 'ツール',
                blog: 'ブログ',
                market: '市場'
            }
        }
    };

    const t = translations[language];

    const techStack = [
        { name: 'React', Icon: FaReact, color: '#61DAFB', bgColor: 'rgba(97, 218, 251, 0.25)' },
        { name: 'Vue', Icon: FaVuejs, color: '#42B883', bgColor: 'rgba(66, 184, 131, 0.25)' },
        { name: 'TypeScript', Icon: SiTypescript, color: '#3178C6', bgColor: 'rgba(49, 120, 198, 0.25)' },
        { name: 'Node.js', Icon: FaNodeJs, color: '#339933', bgColor: 'rgba(51, 153, 51, 0.25)' },
        { name: 'Python', Icon: FaPython, color: '#3776AB', bgColor: 'rgba(55, 118, 171, 0.25)' },
        { name: 'Tailwind', Icon: SiTailwindcss, color: '#06B6D4', bgColor: 'rgba(6, 182, 212, 0.25)' },
        { name: 'Docker', Icon: FaDocker, color: '#2496ED', bgColor: 'rgba(36, 150, 237, 0.25)' },
        { name: 'Git', Icon: FaGitAlt, color: '#F05032', bgColor: 'rgba(240, 80, 50, 0.25)' },
    ];

    return (
        <div className={`min-h-screen ${darkMode ? 'dark bg-slate-900' : 'bg-slate-50'} transition-colors duration-300`}>
            {/* 顶部导航栏 */}
            <nav className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 dark:bg-slate-900/80 border-b border-gray-200 dark:border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-8">
                            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
                                Yoru
                            </Link>
                            <div className="hidden md:flex gap-6">
                                <a href="#about" className="text-gray-700 dark:text-gray-300 hover:text-pink-500 transition-colors">{t.nav.about}</a>
                                <a href="#tools" className="text-gray-700 dark:text-gray-300 hover:text-pink-500 transition-colors">{t.nav.tools}</a>
                                <Link to="/gallery" className="text-gray-700 dark:text-gray-300 hover:text-pink-500 transition-colors">📸 相册</Link>
                                <Link to="/blog" className="text-gray-700 dark:text-gray-300 hover:text-pink-500 transition-colors">{t.nav.blog}</Link>
                                <Link to="/heatmap" className="text-gray-700 dark:text-gray-300 hover:text-pink-500 transition-colors">{t.nav.market}</Link>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            {/* 语言切换 */}
                            <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                                <button
                                    onClick={() => setLanguage('zh')}
                                    className={`px-3 py-1 rounded text-sm transition-colors ${language === 'zh' ? 'bg-white dark:bg-gray-700 text-pink-500 font-semibold' : 'text-gray-600 dark:text-gray-400'}`}
                                >
                                    中文
                                </button>
                                <button
                                    onClick={() => setLanguage('en')}
                                    className={`px-3 py-1 rounded text-sm transition-colors ${language === 'en' ? 'bg-white dark:bg-gray-700 text-pink-500 font-semibold' : 'text-gray-600 dark:text-gray-400'}`}
                                >
                                    EN
                                </button>
                                <button
                                    onClick={() => setLanguage('jp')}
                                    className={`px-3 py-1 rounded text-sm transition-colors ${language === 'jp' ? 'bg-white dark:bg-gray-700 text-pink-500 font-semibold' : 'text-gray-600 dark:text-gray-400'}`}
                                >
                                    日本語
                                </button>
                            </div>
                            <button
                                onClick={() => setDarkMode(!darkMode)}
                                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            >
                                {darkMode ? '🌙' : '☀️'}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* 主内容区域 - 左右两栏布局 */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* 左侧主内容区 */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* 个人介绍卡片 */}
                        <section data-aos="fade-up">
                            <div className="bg-gradient-to-r from-cyan-400 to-blue-400 dark:from-cyan-500 dark:to-blue-500 rounded-2xl p-8 text-white shadow-xl">
                                <p className="text-lg md:text-xl mb-2 font-medium">
                                    {t.greeting}
                                </p>
                                <h1 className="text-3xl md:text-4xl font-bold mb-3">
                                    {t.dream}
                                </h1>
                                <p className="text-base opacity-95">
                                    {t.skills}
                                </p>
                            </div>
                        </section>

                        {/* 学生信息 */}
                        <section data-aos="fade-up" data-aos-delay="100">
                            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                    <span>{t.studentTitle}</span>
                                </h2>
                                <div className="space-y-3 text-gray-700 dark:text-gray-300">
                                    <div className="flex items-start gap-3">
                                        <span className="text-xl">😺</span>
                                        <p>{t.aboutMe.coding}</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-xl">🎂</span>
                                        <p>{t.aboutMe.birthday}</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-xl">🔥</span>
                                        <p>{t.aboutMe.learning}</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* 头像和工作经历 */}
                        <section data-aos="fade-up" data-aos-delay="200">
                            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-cyan-400 shadow-lg">
                                        <img
                                            src="/images/avatar.webp?v=2"
                                            alt="Avatar"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Yoru</h2>
                                        <p className="text-gray-600 dark:text-gray-400">Full-stack Developer</p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* 右侧边栏 */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* 技术栈 */}
                        <section data-aos="fade-up">
                            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">{t.techStack}</h3>
                                <div className="grid grid-cols-4 gap-2">
                                    {techStack.map((tech, idx) => (
                                        <div
                                            key={idx}
                                            className="aspect-square flex items-center justify-center rounded-xl transition-all hover:scale-105 cursor-pointer shadow-sm"
                                            style={{
                                                backgroundColor: tech.bgColor,
                                            }}
                                            title={tech.name}
                                        >
                                            <tech.Icon className="text-4xl" style={{ color: tech.color }} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>

                        {/* 兴趣爱好 */}
                        <section data-aos="fade-up" data-aos-delay="100">
                            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                    <span>💫</span>
                                    <span>{t.interests}</span>
                                </h3>
                                <div className="space-y-2.5">
                                    {t.interestsList.map((interest, idx) => (
                                        <div key={idx} className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                                            <span className="text-xl">{interest.icon}</span>
                                            <span className="text-sm">{interest.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>

                        {/* 联系方式 */}
                        <section data-aos="fade-up" data-aos-delay="200">
                            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                    <span>📬</span>
                                    <span>{t.contact}</span>
                                </h3>
                                <div className="space-y-2.5">
                                    <a href="https://github.com/smjhhhh" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-blue-500 transition-colors text-sm">
                                        <span className="text-xl">💼</span>
                                        <span>GitHub</span>
                                    </a>
                                    <a href="mailto:your@email.com" className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-blue-500 transition-colors text-sm">
                                        <span className="text-xl">📧</span>
                                        <span>Email</span>
                                    </a>
                                </div>
                            </div>
                        </section>

                        {/* 相册展示 */}
                        <section data-aos="fade-up" data-aos-delay="300">
                            <PhotoFrame />
                        </section>
                    </div>
                </div>
            </div>

            {/* 工具仪表板区 */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <section id="tools" className="mb-20">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center" data-aos="fade-up">
                        {t.toolbox}
                    </h2>

                    {/* 第一行：时钟 + 天气 + 世界时钟 */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                        <div className="bg-sky-100 dark:bg-sky-900 rounded-2xl shadow-lg p-6 border border-sky-200 dark:border-sky-700" data-aos="fade-up">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                ⏰ {t.countdown}
                            </h3>
                            <Countdown />
                        </div>
                        <div className="bg-sky-100 dark:bg-sky-900 rounded-2xl shadow-lg p-6 border border-sky-200 dark:border-sky-700" data-aos="fade-up" data-aos-delay="100">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                🌤️ {t.weather}
                            </h3>
                            <WeatherWidget />
                        </div>
                        <div className="bg-sky-100 dark:bg-sky-900 rounded-2xl shadow-lg p-6 border border-sky-200 dark:border-sky-700" data-aos="fade-up" data-aos-delay="200">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                🌍 {t.worldClock}
                            </h3>
                            <WorldClock />
                        </div>
                    </div>

                    {/* 第二行：黄金图表 + 汇率 */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                        <div className="bg-sky-100 dark:bg-sky-900 rounded-2xl shadow-lg p-6 border border-sky-200 dark:border-sky-700" data-aos="fade-up">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                📊 {t.goldPrice}
                            </h3>
                            <GoldChart />
                        </div>
                        <div className="bg-sky-100 dark:bg-sky-900 rounded-2xl shadow-lg p-6 border border-sky-200 dark:border-sky-700" data-aos="fade-up" data-aos-delay="100">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                💱 {t.exchangeRate}
                            </h3>
                            <ExchangeRate />
                        </div>
                    </div>

                    {/* 第三行：地图 + 订阅 */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                        <div className="bg-sky-100 dark:bg-sky-900 rounded-2xl shadow-lg p-6 border border-sky-200 dark:border-sky-700" data-aos="fade-up">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                🗺️ {t.worldMap}
                            </h3>
                            <WorldMap />
                        </div>
                        <div className="bg-sky-100 dark:bg-sky-900 rounded-2xl shadow-lg p-6 border border-sky-200 dark:border-sky-700" data-aos="fade-up" data-aos-delay="100">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                📰 {t.feeds}
                            </h3>
                            <FeedsWidget />
                        </div>
                    </div>

                    {/* 快捷导航 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4" data-aos="fade-up">
                        <Link
                            to="/heatmap"
                            className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all hover:scale-105 text-center"
                        >
                            <div className="text-3xl mb-2">📊</div>
                            <div className="text-xl font-bold">{t.marketHeatmap}</div>
                            <div className="text-sm opacity-90 mt-1">{t.marketHeatmapDesc}</div>
                        </Link>
                        <Link
                            to="/blog"
                            className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all hover:scale-105 text-center"
                        >
                            <div className="text-3xl mb-2">📝</div>
                            <div className="text-xl font-bold">{t.techBlog}</div>
                            <div className="text-sm opacity-90 mt-1">{t.techBlogDesc}</div>
                        </Link>
                    </div>
                </section>
            </div>

            {/* 左下角固定组件 */}
            <div className="fixed bottom-8 left-8 z-50 flex flex-col gap-4">
                <FloatingAI />
                <FloatingGame />
            </div>

            {/* 页脚 */}
            <footer className="bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-gray-700 py-8">
                <div className="max-w-7xl mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
                    <p>© 2025 Yoru. Built with React & Tailwind CSS.</p>
                </div>
            </footer>
        </div>
    );
}

export default HomePage;
