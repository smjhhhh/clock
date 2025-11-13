import { useState, useEffect } from 'react';

function AnalogClock() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const seconds = time.getSeconds();
    const minutes = time.getMinutes();
    const hours = time.getHours();

    const secondsDegrees = seconds * 6; // 360 / 60
    const minutesDegrees = minutes * 6 + seconds * 0.1;
    const hoursDegrees = hours * 30 + minutes * 0.5;

    return (
        <div className="flex flex-col items-center">
            <h2 className="text-2xl font-semibold mb-6
  text-center text-green-400">模拟时钟</h2>

            {/* 时钟圆盘 */}
            <div className="relative w-64 h-64 bg-black
  rounded-full shadow-2xl border-4 border-green-500">

                {/* 中心点 */}
                <div className="absolute top-1/2 left-1/2 w-4
   h-4 bg-green-500 rounded-full -translate-x-1/2 -translate-y-1/2
  z-20 shadow-lg shadow-green-500/50"></div>

                {/* 时针 */}
                <div
                    className="absolute top-1/2 left-1/2 w-2
  h-16 bg-green-500 rounded-full origin-bottom -translate-x-1/2
  -translate-y-full shadow-lg shadow-green-500/50"
                    style={{
                        transform: `translateX(-50%)
  translateY(-100%) rotate(${hoursDegrees}deg)`
                    }}
                ></div>

                {/* 分针 */}
                <div
                    className="absolute top-1/2 left-1/2
  w-1.5 h-24 bg-green-400 rounded-full origin-bottom
  -translate-x-1/2 -translate-y-full shadow-lg shadow-green-400/50"
                    style={{
                        transform: `translateX(-50%)
  translateY(-100%) rotate(${minutesDegrees}deg)`
                    }}
                ></div>

                {/* 秒针 */}
                <div
                    className="absolute top-1/2 left-1/2
  w-0.5 h-28 bg-green-300 rounded-full origin-bottom
  -translate-x-1/2 -translate-y-full shadow-lg shadow-green-300/50"
                    style={{
                        transform: `translateX(-50%)
  translateY(-100%) rotate(${secondsDegrees}deg)`
                    }}
                ></div>

                {/* 刻度 - 12个小时刻度 */}
                {[...Array(12)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute top-1/2 left-1/2 w-1 h-3 bg-green-500 -translate-x-1/2"
                        style={{
                            transform: `translate(-50%, -50%) rotate(${i * 30}deg) translateY(-120px)`
                        }}
                    ></div>
                ))}
            </div>
        </div>
    );
}

export default AnalogClock;
