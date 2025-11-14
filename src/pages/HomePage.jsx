import Countdown from '../Countdown.jsx';
import MatrixRain from '../MatrixRain.jsx';
import GoldChart from '../components/GoldChart.jsx';
import WeatherWidget from '../components/WeatherWidget.jsx';
import FloatingAI from '../components/FloatingAI.jsx';
import WorldClock from '../components/WorldClock.jsx';
import FloatingGame from '../components/FloatingGame.jsx';
import ExchangeRate from '../components/ExchangeRate.jsx';
import WorldMap from '../components/WorldMap.jsx';
import FeedsWidget from '../components/FeedsWidget.jsx';
import { Link } from 'react-router-dom';

function HomePage() {
    return (
        <div className="min-h-screen relative text-green-400">
            {/* Matrix 数字雨背景 */}
            <MatrixRain />

            {/* 倒计时 - 左上角 */}
            <div className="absolute top-8 left-8 z-10">
                <Countdown />
            </div>

            {/* 天气 + 世界时钟 + 地图 - 左下角 */}
            <div className="absolute bottom-8 left-8 z-10 flex flex-col gap-3">
                <WeatherWidget />
                <WorldClock />
                <WorldMap />
            </div>

            {/* 右上角区域 - 黄金价格 + 汇率 + 订阅 + 导航按钮 */}
            <div className="absolute top-8 right-8 z-10 flex flex-col gap-3">
                {/* 黄金价格图表 */}
                <GoldChart />

                {/* 汇率表 */}
                <ExchangeRate />

                {/* 订阅中心 */}
                <FeedsWidget />

                {/* 页面导航按钮 */}
                <Link
                    to="/heatmap"
                    className="bg-purple-900/50 hover:bg-purple-800/70 backdrop-blur-lg px-4 py-2 rounded-lg border-2 border-purple-700/50 text-purple-300 hover:text-purple-100 transition-all font-semibold text-center"
                >
                    📊 市场热力图
                </Link>

                <Link
                    to="/blog"
                    className="bg-emerald-900/50 hover:bg-emerald-800/70 backdrop-blur-lg px-4 py-2 rounded-lg border-2 border-emerald-700/50 text-emerald-300 hover:text-emerald-100 transition-all font-semibold text-center"
                >
                    📝 博客
                </Link>
            </div>

            {/* 浮动 AI 助手 - 右下角 */}
            <FloatingAI />

            {/* 浮动游戏 - 底部中间 */}
            <FloatingGame />
        </div>
    );
}

export default HomePage;
