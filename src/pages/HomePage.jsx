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
import { FaReact, FaVuejs, FaNodeJs, FaPython, FaDocker, FaGitAlt } from 'react-icons/fa';
import { SiTypescript, SiTailwindcss } from 'react-icons/si';

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
        { name: 'React', Icon: FaReact, color: '#61DAFB', bgColor: 'rgba(97, 218, 251, 0.25)' },
        { name: 'Vue', Icon: FaVuejs, color: '#42B883', bgColor: 'rgba(66, 184, 131, 0.25)' },
        { name: 'TypeScript', Icon: SiTypescript, color: '#3178C6', bgColor: 'rgba(49, 120, 198, 0.25)' },
        { name: 'Node.js', Icon: FaNodeJs, color: '#339933', bgColor: 'rgba(51, 153, 51, 0.25)' },
        { name: 'Python', Icon: FaPython, color: '#3776AB', bgColor: 'rgba(55, 118, 171, 0.25)' },
        { name: 'Tailwind', Icon: SiTailwindcss, color: '#06B6D4', bgColor: 'rgba(6, 182, 212, 0.25)' },
        { name: 'Docker', Icon: FaDocker, color: '#2496ED', bgColor: 'rgba(36, 150, 237, 0.25)' },
        { name: 'Git', Icon: FaGitAlt, color: '#F05032', bgColor: 'rgba(240, 80, 50, 0.25)' },
    ];

    const honors = [
        { title: 'Apache Fury Official Website Builder', year: '2024', icon: '🏆' },
        { title: 'Tencent Cloud Best Open Source Contributor', year: '2024', icon: '🏆' },
        { title: 'Alibaba Cloud Tianchi Champion', year: '2024', icon: '🏆' },
    ];

    const interests = [
        { name: 'Traveling', icon: '✈️' },
        { name: 'Music', icon: '🎵' },
        { name: 'Photography', icon: '📷' },
        { name: 'Coding', icon: '💻' },
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

            {/* 主内容区域 - 左右两栏布局 */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* 左侧主内容区 */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* 个人介绍卡片 */}
                        <section data-aos="fade-up">
                            <div className="bg-gradient-to-r from-cyan-400 to-blue-400 dark:from-cyan-500 dark:to-blue-500 rounded-2xl p-8 text-white shadow-xl">
                                <p className="text-lg md:text-xl mb-2 font-medium">
                                    你好，我是 Yoru，来自上海，很高兴认识你 👋
                                </p>
                                <h1 className="text-3xl md:text-4xl font-bold mb-3">
                                    🌟 Dream to be a full-stack developer.
                                </h1>
                                <p className="text-base opacity-95">
                                    前端开发 / 产品设计 / 模型调参 / agent 开发
                                </p>
                            </div>
                        </section>

                        {/* 学生信息 */}
                        <section data-aos="fade-up" data-aos-delay="100">
                            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                    <span>🎓</span>
                                    <span>I am a software engineering student.</span>
                                </h2>
                                <div className="space-y-3 text-gray-700 dark:text-gray-300">
                                    <div className="flex items-start gap-3">
                                        <span className="text-xl">😺</span>
                                        <p>Love coding and open source.</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-xl">🎂</span>
                                        <p>2002.9.26 born in Shanghai.</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-xl">🔥</span>
                                        <p>Passionate learner, always growing</p>
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
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">技术栈</h3>
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
                        <section data-aos="fade-up" data-aos-delay="200">
                            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                    <span>💫</span>
                                    <span>Interests</span>
                                </h3>
                                <div className="space-y-2.5">
                                    {interests.map((interest, idx) => (
                                        <div key={idx} className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                                            <span className="text-xl">{interest.icon}</span>
                                            <span className="text-sm">{interest.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>

                        {/* 联系方式 */}
                        <section data-aos="fade-up" data-aos-delay="300">
                            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                    <span>📬</span>
                                    <span>Contact</span>
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
                    </div>
                </div>
            </div>

            {/* 工具仪表板区 */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <section id="tools" className="mb-20">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center" data-aos="fade-up">
                        Yoru's 工具箱
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
                                🌍 工作时间
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
