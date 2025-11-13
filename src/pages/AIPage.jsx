import OllamaChat from '../components/OllamaChat.jsx';
import MatrixRain from '../MatrixRain.jsx';
import { Link } from 'react-router-dom';

function AIPage() {
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

            {/* AI 聊天 - 居中 */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-full max-w-4xl px-8">
                <OllamaChat />
            </div>
        </div>
    );
}

export default AIPage;
