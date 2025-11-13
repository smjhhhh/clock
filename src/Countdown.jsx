import { useState, useEffect } from 'react';

function Countdown() {
    // 默认25分钟（番茄钟）
    const [totalSeconds] = useState(25 * 60);
    const [remainingSeconds, setRemainingSeconds] = useState(25 * 60);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let timer;
        if (isRunning && remainingSeconds > 0) {
            timer = setInterval(() => {
                setRemainingSeconds(prev => {
                    if (prev <= 1) {
                        setIsRunning(false);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [isRunning, remainingSeconds]);

    // 格式化时间显示
    const minutes = Math.floor(remainingSeconds / 60).toString().padStart(2, '0');
    const seconds = (remainingSeconds % 60).toString().padStart(2, '0');

    // 开始/暂停
    const toggleTimer = () => {
        setIsRunning(!isRunning);
    };

    // 重置
    const resetTimer = () => {
        setRemainingSeconds(totalSeconds);
        setIsRunning(false);
    };

    return (
        <div className="flex flex-col items-center gap-3">
            {/* LED 显示屏 - 缩小版 */}
            <div className="bg-black rounded-lg p-4 shadow-xl border-2 border-red-900">
                <div className="flex items-center gap-1">
                    {/* 分 */}
                    <div className="flex gap-0.5">
                        <LEDDigit digit={minutes[0]} />
                        <LEDDigit digit={minutes[1]} />
                    </div>

                    {/* 冒号 */}
                    <div className="flex flex-col gap-2 mx-0.5">
                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full shadow-md shadow-red-500/50"></div>
                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full shadow-md shadow-red-500/50"></div>
                    </div>

                    {/* 秒 */}
                    <div className="flex gap-0.5">
                        <LEDDigit digit={seconds[0]} />
                        <LEDDigit digit={seconds[1]} />
                    </div>
                </div>
            </div>

            {/* 控制按钮 */}
            <div className="flex gap-2">
                {/* 开始/暂停按钮 */}
                <button
                    onClick={toggleTimer}
                    className="w-10 h-10 bg-red-900 hover:bg-red-800 text-red-400 text-xl rounded border border-red-700 transition-colors flex items-center justify-center"
                    title={isRunning ? "暂停" : "开始"}
                >
                    {isRunning ? '⏸' : '▶'}
                </button>

                {/* 重置按钮 */}
                <button
                    onClick={resetTimer}
                    className="w-10 h-10 bg-red-900 hover:bg-red-800 text-red-400 text-xl rounded border border-red-700 transition-colors flex items-center justify-center"
                    title="重置"
                >
                    ↻
                </button>
            </div>
        </div>
    );
}

// LED 数字组件 - 七段数码管
function LEDDigit({ digit }) {
    const segments = {
        '0': [true, true, true, true, true, true, false],
        '1': [false, true, true, false, false, false, false],
        '2': [true, true, false, true, true, false, true],
        '3': [true, true, true, true, false, false, true],
        '4': [false, true, true, false, false, true, true],
        '5': [true, false, true, true, false, true, true],
        '6': [true, false, true, true, true, true, true],
        '7': [true, true, true, false, false, false, false],
        '8': [true, true, true, true, true, true, true],
        '9': [true, true, true, true, false, true, true],
    };

    const [a, b, c, d, e, f, g] = segments[digit] || [false, false, false, false, false, false, false];

    return (
        <div className="relative w-8 h-14">
            {/* 上横 (a) */}
            <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-6 h-1.5 ${a ? 'bg-red-500 shadow-md shadow-red-500/50' : 'bg-gray-800'}`}
                 style={{ clipPath: 'polygon(10% 0%, 90% 0%, 80% 100%, 20% 100%)' }}></div>

            {/* 右上竖 (b) */}
            <div className={`absolute top-0.5 right-0 w-1.5 h-5 ${b ? 'bg-red-500 shadow-md shadow-red-500/50' : 'bg-gray-800'}`}
                 style={{ clipPath: 'polygon(0% 10%, 100% 20%, 100% 80%, 0% 90%)' }}></div>

            {/* 右下竖 (c) */}
            <div className={`absolute bottom-0.5 right-0 w-1.5 h-5 ${c ? 'bg-red-500 shadow-md shadow-red-500/50' : 'bg-gray-800'}`}
                 style={{ clipPath: 'polygon(0% 10%, 100% 20%, 100% 80%, 0% 90%)' }}></div>

            {/* 下横 (d) */}
            <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-1.5 ${d ? 'bg-red-500 shadow-md shadow-red-500/50' : 'bg-gray-800'}`}
                 style={{ clipPath: 'polygon(10% 0%, 90% 0%, 80% 100%, 20% 100%)' }}></div>

            {/* 左下竖 (e) */}
            <div className={`absolute bottom-0.5 left-0 w-1.5 h-5 ${e ? 'bg-red-500 shadow-md shadow-red-500/50' : 'bg-gray-800'}`}
                 style={{ clipPath: 'polygon(0% 10%, 100% 20%, 100% 80%, 0% 90%)' }}></div>

            {/* 左上竖 (f) */}
            <div className={`absolute top-0.5 left-0 w-1.5 h-5 ${f ? 'bg-red-500 shadow-md shadow-red-500/50' : 'bg-gray-800'}`}
                 style={{ clipPath: 'polygon(0% 10%, 100% 20%, 100% 80%, 0% 90%)' }}></div>

            {/* 中横 (g) */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-1.5 ${g ? 'bg-red-500 shadow-md shadow-red-500/50' : 'bg-gray-800'}`}
                 style={{ clipPath: 'polygon(10% 0%, 90% 0%, 80% 100%, 20% 100%)' }}></div>
        </div>
    );
}

export default Countdown;
