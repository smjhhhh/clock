import { useState } from 'react';
import MineSweeper from './MineSweeper.jsx';

function FloatingGame() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* 游戏窗口 */}
            {isOpen && (
                <div className="bg-black/95 backdrop-blur-lg rounded-lg shadow-2xl border-2 border-green-700/50 p-4 mb-4">
                    {/* 头部 */}
                    <div className="flex items-center justify-between mb-3 pb-2 border-b border-green-700/30">
                        <h3 className="text-green-400 font-bold text-sm font-mono">💣 扫雷游戏</h3>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-green-500 hover:text-green-300 text-xs"
                            title="关闭"
                        >
                            ✕
                        </button>
                    </div>

                    {/* 游戏内容 */}
                    <MineSweeper />
                </div>
            )}

            {/* 浮动按钮 */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-14 h-14 bg-gradient-to-br from-yellow-600 to-yellow-800 hover:from-yellow-500 hover:to-yellow-700 text-white rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 border-2 border-yellow-400/50"
                title="扫雷游戏"
            >
                {isOpen ? (
                    <span className="text-xl">✕</span>
                ) : (
                    <span className="text-2xl">💣</span>
                )}
            </button>
        </>
    );
}

export default FloatingGame;
