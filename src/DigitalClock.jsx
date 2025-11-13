import { useState, useEffect } from 'react';

function DigitalClock() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="bg-green-950/30 backdrop-blur-lg rounded-3xl p-10 shadow-2xl border-2 border-green-500/30">
            <h2 className="text-2xl font-semibold mb-6 text-center text-green-400">数字时钟</h2>
            <div className="text-7xl font-bold font-mono tracking-wider text-center text-green-400 drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]">
                {time.toLocaleTimeString()}
            </div>
        </div>
    );
}

export default DigitalClock;