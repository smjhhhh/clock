import { useState, useEffect } from 'react';

function WorldClock() {
    const [times, setTimes] = useState({
        shanghai: '',
        arlington: ''
    });

    useEffect(() => {
        const updateTimes = () => {
            const now = new Date();

            // 上海时间 (UTC+8)
            const shanghaiTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Shanghai' }));
            const shanghaiFormatted = shanghaiTime.toLocaleString('zh-CN', {
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            });

            // 阿灵顿时间 (UTC-5/UTC-4 depending on DST)
            const arlingtonTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }));
            const arlingtonFormatted = arlingtonTime.toLocaleString('en-US', {
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            });

            setTimes({
                shanghai: shanghaiFormatted,
                arlington: arlingtonFormatted
            });
        };

        updateTimes();
        const interval = setInterval(updateTimes, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-sky-100 dark:bg-sky-900 backdrop-blur-lg rounded-lg p-4 shadow-2xl border-2 border-sky-300 dark:border-sky-700">
            <h3 className="text-gray-800 dark:text-gray-200 font-bold text-sm mb-3 font-mono">🌍 世界时钟</h3>

            <div className="space-y-2">
                {/* 上海 */}
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <span className="text-xl">🇨🇳</span>
                        <span className="text-gray-700 dark:text-gray-300 text-sm font-mono">上海</span>
                    </div>
                    <span className="text-green-600 dark:text-green-400 font-bold font-mono text-base">
                        {times.shanghai}
                    </span>
                </div>

                {/* 阿灵顿 */}
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <span className="text-xl">🇺🇸</span>
                        <span className="text-gray-700 dark:text-gray-300 text-sm font-mono">阿灵顿</span>
                    </div>
                    <span className="text-green-600 dark:text-green-400 font-bold font-mono text-base">
                        {times.arlington}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default WorldClock;
