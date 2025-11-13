import { useState, useEffect } from 'react';

function ExchangeRate() {
    const [rates, setRates] = useState({
        usdCny: null,
        jpyCny: null,
        loading: true,
        error: null
    });

    useEffect(() => {
        fetchRates();
        // 每5分钟更新一次
        const interval = setInterval(fetchRates, 5 * 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    const fetchRates = async () => {
        try {
            // 使用免费的汇率API
            const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
            const data = await response.json();

            // USD to CNY
            const usdCny = data.rates.CNY;

            // JPY to CNY (先转成USD，再转CNY)
            const jpyToUsd = 1 / data.rates.JPY;
            const jpyCny = jpyToUsd * data.rates.CNY;

            setRates({
                usdCny: usdCny.toFixed(4),
                jpyCny: jpyCny.toFixed(4),
                loading: false,
                error: null
            });
        } catch (error) {
            console.error('获取汇率失败:', error);
            setRates(prev => ({
                ...prev,
                loading: false,
                error: '获取失败'
            }));
        }
    };

    if (rates.loading) {
        return (
            <div className="bg-black/80 backdrop-blur-lg rounded-lg p-3 shadow-2xl border-2 border-orange-700/50">
                <h3 className="text-orange-400 font-bold text-xs mb-2 font-mono">💱 实时汇率</h3>
                <div className="text-gray-400 text-xs font-mono">加载中...</div>
            </div>
        );
    }

    return (
        <div className="bg-black/80 backdrop-blur-lg rounded-lg p-3 shadow-2xl border-2 border-orange-700/50">
            <h3 className="text-orange-400 font-bold text-xs mb-2 font-mono">💱 实时汇率</h3>

            <div className="space-y-1.5">
                {/* USD/CNY */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                        <span className="text-base">🇺🇸</span>
                        <span className="text-gray-300 text-xs font-mono">USD/CNY</span>
                    </div>
                    <span className="text-green-400 font-bold text-sm font-mono">
                        {rates.error ? rates.error : `¥${rates.usdCny}`}
                    </span>
                </div>

                {/* JPY/CNY */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                        <span className="text-base">🇯🇵</span>
                        <span className="text-gray-300 text-xs font-mono">JPY/CNY</span>
                    </div>
                    <span className="text-green-400 font-bold text-sm font-mono">
                        {rates.error ? rates.error : `¥${rates.jpyCny}`}
                    </span>
                </div>
            </div>

            {!rates.error && (
                <div className="mt-2 pt-2 border-t border-orange-700/30">
                    <div className="text-gray-500 text-[10px] font-mono text-center">
                        每5分钟更新
                    </div>
                </div>
            )}
        </div>
    );
}

export default ExchangeRate;
