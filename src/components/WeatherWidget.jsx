import { useState, useEffect } from 'react';

// 天气代码映射到 emoji 图标
const getWeatherIcon = (code) => {
    const iconMap = {
        '113': '☀️',  // 晴天
        '116': '⛅',  // 局部多云
        '119': '☁️',  // 多云
        '122': '☁️',  // 阴天
        '143': '🌫️',  // 雾
        '176': '🌦️',  // 局部有雨
        '179': '🌨️',  // 局部有雪
        '182': '🌧️',  // 雨夹雪
        '185': '🌧️',  // 雨夹雪
        '200': '⛈️',  // 雷雨
        '227': '🌨️',  // 暴雪
        '230': '❄️',  // 暴雪
        '248': '🌫️',  // 雾
        '260': '🌫️',  // 冻雾
        '263': '🌦️',  // 小雨
        '266': '🌧️',  // 小雨
        '281': '🌧️',  // 冻雨
        '284': '🌧️',  // 冻雨
        '293': '🌦️',  // 小雨
        '296': '🌧️',  // 小雨
        '299': '🌧️',  // 中雨
        '302': '🌧️',  // 大雨
        '305': '🌧️',  // 大雨
        '308': '🌧️',  // 暴雨
        '311': '🌧️',  // 冻雨
        '314': '🌧️',  // 冻雨
        '317': '🌨️',  // 雨夹雪
        '320': '🌨️',  // 雨夹雪
        '323': '🌨️',  // 小雪
        '326': '❄️',  // 小雪
        '329': '❄️',  // 中雪
        '332': '❄️',  // 大雪
        '335': '❄️',  // 大雪
        '338': '❄️',  // 暴雪
        '350': '🌧️',  // 冰雹
        '353': '🌦️',  // 小雨
        '356': '🌧️',  // 中雨
        '359': '🌧️',  // 大雨
        '362': '🌨️',  // 雨夹雪
        '365': '🌨️',  // 雨夹雪
        '368': '🌨️',  // 小雪
        '371': '❄️',  // 中雪
        '374': '🌧️',  // 冰雹
        '377': '🌧️',  // 冰雹
        '386': '⛈️',  // 雷雨
        '389': '⛈️',  // 雷暴大雨
        '392': '⛈️',  // 雷阵雪
        '395': '⛈️',  // 雷阵雪
    };
    return iconMap[code] || '🌤️';
};

function WeatherCard({ city, cityEn }) {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await fetch(`https://wttr.in/${cityEn}?format=j1`);
                const data = await response.json();
                setWeather(data);
                setLoading(false);
            } catch (error) {
                console.error('获取天气失败:', error);
                setLoading(false);
            }
        };

        fetchWeather();
        // 每30分钟更新一次
        const interval = setInterval(fetchWeather, 30 * 60 * 1000);
        return () => clearInterval(interval);
    }, [cityEn]);

    if (loading) {
        return (
            <div className="bg-black/80 backdrop-blur-lg rounded-lg p-4 shadow-xl min-w-[180px]">
                <div className="text-blue-300 text-sm animate-pulse">加载中...</div>
            </div>
        );
    }

    if (!weather) return null;

    const current = weather.current_condition[0];
    const temp = current.temp_C;
    const weatherCode = current.weatherCode;
    const weatherDesc = current.lang_zh_cn?.[0]?.value || current.weatherDesc[0].value;
    const icon = getWeatherIcon(weatherCode);

    return (
        <div className="bg-black/80 backdrop-blur-lg rounded-lg p-4 shadow-xl min-w-[180px]">
            <div className="text-blue-300 text-sm font-semibold mb-2">{city}</div>
            <div className="flex items-center gap-3">
                <div className="text-5xl">{icon}</div>
                <div>
                    <div className="text-3xl font-bold text-blue-100">{temp}°C</div>
                    <div className="text-xs text-gray-400">{weatherDesc}</div>
                </div>
            </div>
        </div>
    );
}

function WeatherWidget() {
    return (
        <div className="space-y-3">
            <WeatherCard city="上海" cityEn="Shanghai" />
            <WeatherCard city="阿灵顿" cityEn="Arlington,VA" />
        </div>
    );
}

export default WeatherWidget;
