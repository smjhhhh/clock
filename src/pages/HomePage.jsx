import Countdown from '../Countdown.jsx';
import MatrixRain from '../MatrixRain.jsx';
import GoldChart from '../components/GoldChart.jsx';
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

            {/* 右上角区域 - 黄金价格 + 导航按钮 */}
            <div className="absolute top-8 right-8 z-10 flex flex-col gap-3">
                {/* 黄金价格图表 */}
                <GoldChart />

                {/* 页面导航按钮 */}
                <Link
                    to="/heatmap"
                    className="bg-purple-900/50 hover:bg-purple-800/70 backdrop-blur-lg px-4 py-2 rounded-lg border-2 border-purple-700/50 text-purple-300 hover:text-purple-100 transition-all font-semibold text-center"
                >
                    📊 市场热力图
                </Link>
            </div>
        </div>
    );
}

export default HomePage;
