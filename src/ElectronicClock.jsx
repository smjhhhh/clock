import { useState, useEffect } from 'react';

function ElectronicClock() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const hours = time.getHours().toString().padStart(2, '0');
    const minutes = time.getMinutes().toString().padStart(2, '0');
    const seconds = time.getSeconds().toString().padStart(2, '0');

    return (
        <div className="flex flex-col items-center">
            {/* LED 显示屏容器 */}
            <div className="bg-black rounded-2xl p-8 shadow-2xl border-4 border-red-900">
                <div className="flex items-center gap-2">
                    {/* 时 */}
                    <div className="flex gap-1">
                        <LEDDigit digit={hours[0]} />
                        <LEDDigit digit={hours[1]} />
                    </div>

                    {/* 冒号 */}
                    <div className="flex flex-col gap-3 mx-1">
                        <div className="w-2 h-2 bg-red-500 rounded-full shadow-lg shadow-red-500/50"></div>
                        <div className="w-2 h-2 bg-red-500 rounded-full shadow-lg shadow-red-500/50"></div>
                    </div>

                    {/* 分 */}
                    <div className="flex gap-1">
                        <LEDDigit digit={minutes[0]} />
                        <LEDDigit digit={minutes[1]} />
                    </div>

                    {/* 冒号 */}
                    <div className="flex flex-col gap-3 mx-1">
                        <div className="w-2 h-2 bg-red-500 rounded-full shadow-lg shadow-red-500/50"></div>
                        <div className="w-2 h-2 bg-red-500 rounded-full shadow-lg shadow-red-500/50"></div>
                    </div>

                    {/* 秒 */}
                    <div className="flex gap-1">
                        <LEDDigit digit={seconds[0]} />
                        <LEDDigit digit={seconds[1]} />
                    </div>
                </div>
            </div>
        </div>
    );
}

// LED 数字组件 - 七段数码管
function LEDDigit({ digit }) {
    // 七段数码管映射：每个数字对应哪些段要亮
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
        <div className="relative w-12 h-20">
            {/* 上横 (a) */}
            <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-8 h-2 ${a ? 'bg-red-500 shadow-lg shadow-red-500/50' : 'bg-gray-800'}`}
                 style={{ clipPath: 'polygon(10% 0%, 90% 0%, 80% 100%, 20% 100%)' }}></div>

            {/* 右上竖 (b) */}
            <div className={`absolute top-1 right-0 w-2 h-8 ${b ? 'bg-red-500 shadow-lg shadow-red-500/50' : 'bg-gray-800'}`}
                 style={{ clipPath: 'polygon(0% 10%, 100% 20%, 100% 80%, 0% 90%)' }}></div>

            {/* 右下竖 (c) */}
            <div className={`absolute bottom-1 right-0 w-2 h-8 ${c ? 'bg-red-500 shadow-lg shadow-red-500/50' : 'bg-gray-800'}`}
                 style={{ clipPath: 'polygon(0% 10%, 100% 20%, 100% 80%, 0% 90%)' }}></div>

            {/* 下横 (d) */}
            <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-2 ${d ? 'bg-red-500 shadow-lg shadow-red-500/50' : 'bg-gray-800'}`}
                 style={{ clipPath: 'polygon(10% 0%, 90% 0%, 80% 100%, 20% 100%)' }}></div>

            {/* 左下竖 (e) */}
            <div className={`absolute bottom-1 left-0 w-2 h-8 ${e ? 'bg-red-500 shadow-lg shadow-red-500/50' : 'bg-gray-800'}`}
                 style={{ clipPath: 'polygon(0% 10%, 100% 20%, 100% 80%, 0% 90%)' }}></div>

            {/* 左上竖 (f) */}
            <div className={`absolute top-1 left-0 w-2 h-8 ${f ? 'bg-red-500 shadow-lg shadow-red-500/50' : 'bg-gray-800'}`}
                 style={{ clipPath: 'polygon(0% 10%, 100% 20%, 100% 80%, 0% 90%)' }}></div>

            {/* 中横 (g) */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-2 ${g ? 'bg-red-500 shadow-lg shadow-red-500/50' : 'bg-gray-800'}`}
                 style={{ clipPath: 'polygon(10% 0%, 90% 0%, 80% 100%, 20% 100%)' }}></div>
        </div>
    );
}

export default ElectronicClock;
