import { useStat, useEffect } from 'react';
function DigitalClock() {
    return (
        <div className="digital-clock">
            <h2>数字时钟</h2>
            <div className="time-display">
                {time.toLocaleTimeString()}
            </div>
        </div>
    );
}
