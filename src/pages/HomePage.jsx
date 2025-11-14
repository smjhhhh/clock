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

function HomePage() {
    const [darkMode, setDarkMode] = useState(false);

    // 初始化 AOS
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
            easing: 'ease-out'
        });
    }, []);

    const personalInfo = {
        name: 'Yoru',
        title: '全栈开发工程师',
        tags: ['INFP', '技术爱好者', '终身学习者', '杀戮尖塔高手'],
        bio: '热爱技术，喜欢探索新事物。专注于前端开发和全栈技术，追求代码的优雅与效率。',
        links: [
            { icon: '💼', text: 'GitHub', url: 'https://github.com/smjhhhh' },
            { icon: '📧', text: 'Email', url: 'mailto:your@email.com' },
        ]
    };

    const techStack = [
        { name: 'React', icon: '⚛️', color: 'bg-blue-100 dark:bg-blue-900' },
        { name: 'Vue', icon: '💚', color: 'bg-green-100 dark:bg-green-900' },
        { name: 'TypeScript', icon: '📘', color: 'bg-blue-100 dark:bg-blue-900' },
        { name: 'Node.js', icon: '🟢', color: 'bg-green-100 dark:bg-green-900' },
        { name: 'Python', icon: '🐍', color: 'bg-yellow-100 dark:bg-yellow-900' },
        { name: 'Tailwind', icon: '🎨', color: 'bg-cyan-100 dark:bg-cyan-900' },
        { name: 'Docker', icon: '🐳', color: 'bg-blue-100 dark:bg-blue-900' },
        { name: 'Git', icon: '📚', color: 'bg-orange-100 dark:bg-orange-900' },
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
                                <a href="#about" className="text-gray-700 dark:text-gray-300 hover:text-pink-500 transition-colors">关于</a>
                                <a href="#tools" className="text-gray-700 dark:text-gray-300 hover:text-pink-500 transition-colors">工具</a>
                                <Link to="/blog" className="text-gray-700 dark:text-gray-300 hover:text-pink-500 transition-colors">博客</Link>
                                <Link to="/heatmap" className="text-gray-700 dark:text-gray-300 hover:text-pink-500 transition-colors">市场</Link>
                            </div>
                        </div>
                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                            {darkMode ? '🌙' : '☀️'}
                        </button>
                    </div>
                </div>
            </nav>

            {/* 主内容区域 */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* 个人介绍区 */}
                <section id="about" className="mb-20" data-aos="fade-up">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                        {/* 左侧 - 个人信息 */}
                        <div>
                            <div className="mb-6">
                                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-cyan-400 shadow-xl mb-6">
                                    <img
                                        src="/images/avatar.webp?v=2"
                                        alt="Avatar"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                                    你好，我是 <span className="bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">Yoru</span>，来自上海，很高兴认识你 👋
                                </h1>
                                <p className="text-lg text-gray-900 dark:text-white mb-4">
                                    🌟 Dream to be a full-stack developer.
                                </p>
                                <p className="text-base text-gray-800 dark:text-gray-200 mb-6">
                                    前端开发 / 产品设计 / 模型调参 / agent 开发
                                </p>
                            </div>

                            {/* 学生信息框 */}
                            <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500 p-4 rounded-lg">
                                <p className="text-blue-800 dark:text-blue-300 flex items-center gap-2">
                                    <span>💡</span>
                                    <span className="font-medium">I am a software engineering student.</span>
                                </p>
                            </div>
                        </div>

                        {/* 右侧 - 关于我 */}
                        <div className="bg-sky-100 dark:bg-sky-900 rounded-2xl shadow-lg p-8 border border-sky-200 dark:border-sky-700">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                                <span>✨</span>
                                <span>About Me</span>
                            </h2>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <span className="text-2xl">😺</span>
                                    <p className="text-gray-900 dark:text-white pt-1">
                                        Love coding and open source.
                                    </p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="text-2xl">🎂</span>
                                    <p className="text-gray-900 dark:text-white pt-1">
                                        2002.9.26 born in Shanghai.
                                    </p>
                                </div>
                                <div className="flex items-center gap-2 pt-2">
                                    <span className="text-2xl">🔥</span>
                                    <span className="text-2xl">🌱</span>
                                    <p className="text-gray-800 dark:text-gray-100 italic">
                                        Passionate learner, always growing
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 技术栈展示 */}
                    <div className="mb-12" data-aos="fade-up" data-aos-delay="100">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">技术栈</h2>
                        <div className="flex flex-wrap justify-center gap-4">
                            {techStack.map((tech, idx) => (
                                <div
                                    key={idx}
                                    className={`${tech.color} px-6 py-3 rounded-xl shadow-sm hover:shadow-md transition-all hover:scale-105 cursor-pointer`}
                                >
                                    <span className="text-2xl mr-2">{tech.icon}</span>
                                    <span className="font-semibold text-gray-800 dark:text-gray-200">{tech.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 工具仪表板区 */}
                <section id="tools" className="mb-20">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center" data-aos="fade-up">
                        我的工具箱
                    </h2>

                    {/* 第一行：时钟 + 天气 + 世界时钟 */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                        <div className="bg-sky-100 dark:bg-sky-900 rounded-2xl shadow-lg p-6 border border-sky-200 dark:border-sky-700" data-aos="fade-up">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                ⏰ 倒计时
                            </h3>
                            <Countdown />
                        </div>
                        <div className="bg-sky-100 dark:bg-sky-900 rounded-2xl shadow-lg p-6 border border-sky-200 dark:border-sky-700" data-aos="fade-up" data-aos-delay="100">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                🌤️ 天气
                            </h3>
                            <WeatherWidget />
                        </div>
                        <div className="bg-sky-100 dark:bg-sky-900 rounded-2xl shadow-lg p-6 border border-sky-200 dark:border-sky-700" data-aos="fade-up" data-aos-delay="200">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                🌍 世界时钟
                            </h3>
                            <WorldClock />
                        </div>
                    </div>

                    {/* 第二行：黄金图表 + 汇率 */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                        <div className="bg-sky-100 dark:bg-sky-900 rounded-2xl shadow-lg p-6 border border-sky-200 dark:border-sky-700" data-aos="fade-up">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                📊 黄金价格
                            </h3>
                            <GoldChart />
                        </div>
                        <div className="bg-sky-100 dark:bg-sky-900 rounded-2xl shadow-lg p-6 border border-sky-200 dark:border-sky-700" data-aos="fade-up" data-aos-delay="100">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                💱 汇率
                            </h3>
                            <ExchangeRate />
                        </div>
                    </div>

                    {/* 第三行：地图 + 订阅 */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                        <div className="bg-sky-100 dark:bg-sky-900 rounded-2xl shadow-lg p-6 border border-sky-200 dark:border-sky-700" data-aos="fade-up">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                🗺️ 世界地图
                            </h3>
                            <WorldMap />
                        </div>
                        <div className="bg-sky-100 dark:bg-sky-900 rounded-2xl shadow-lg p-6 border border-sky-200 dark:border-sky-700" data-aos="fade-up" data-aos-delay="100">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                📰 订阅中心
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
                            <div className="text-xl font-bold">市场热力图</div>
                            <div className="text-sm opacity-90 mt-1">查看实时市场数据</div>
                        </Link>
                        <Link
                            to="/blog"
                            className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all hover:scale-105 text-center"
                        >
                            <div className="text-3xl mb-2">📝</div>
                            <div className="text-xl font-bold">技术博客</div>
                            <div className="text-sm opacity-90 mt-1">分享学习与思考</div>
                        </Link>
                    </div>
                </section>
            </div>

            {/* 浮动组件 */}
            <FloatingAI />
            <FloatingGame />

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
