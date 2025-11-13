# 如何接入真实黄金价格 API

目前黄金价格组件使用的是**模拟数据**。以下教你如何接入真实的 API。

## 🌟 推荐的免费 API

### 1. **Alpha Vantage** (推荐)
- **优点**: 稳定，免费，支持多种金属价格
- **限制**: 每分钟5次请求，每天500次
- **官网**: https://www.alphavantage.co/

#### 注册步骤：
1. 访问 https://www.alphavantage.co/support/#api-key
2. 填写邮箱获取免费 API Key
3. 收到类似 `ABCD1234EFGH5678` 的密钥

#### 使用示例：
```javascript
// 在 GoldPrice.jsx 中替换模拟数据

const API_KEY = 'YOUR_API_KEY'; // 替换成你的密钥
const API_URL = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=GC=F&apikey=${API_KEY}`;

useEffect(() => {
    const fetchPrice = async () => {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            const quote = data['Global Quote'];

            setPriceData({
                current: parseFloat(quote['05. price']),
                change: parseFloat(quote['09. change']),
                changePercent: parseFloat(quote['10. change percent'].replace('%', '')),
                high: parseFloat(quote['03. high']),
                low: parseFloat(quote['04. low']),
                lastUpdate: new Date()
            });
        } catch (error) {
            console.error('获取黄金价格失败:', error);
        }
    };

    fetchPrice();
    const interval = setInterval(fetchPrice, 60000); // 每分钟更新
    return () => clearInterval(interval);
}, []);
```

---

### 2. **Metals-API.com**
- **优点**: 专门针对贵金属价格
- **限制**: 免费版每月100次请求
- **官网**: https://metals-api.com/

#### 使用示例：
```javascript
const API_KEY = 'YOUR_API_KEY';
const API_URL = `https://metals-api.com/api/latest?access_key=${API_KEY}&base=USD&symbols=XAU`;

const response = await fetch(API_URL);
const data = await response.json();
const goldPrice = 1 / data.rates.XAU; // 转换为美元/盎司
```

---

### 3. **Twelve Data** (高质量)
- **优点**: 实时数据，质量高
- **限制**: 免费版每分钟8次请求
- **官网**: https://twelvedata.com/

---

## 🔧 如何修改代码接入真实 API

### 完整代码示例：

```javascript
// GoldPrice.jsx

import { useState, useEffect } from 'react';

function GoldPrice() {
    const [priceData, setPriceData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_KEY = 'YOUR_API_KEY_HERE'; // 👈 在这里填入你的 API Key

    useEffect(() => {
        const fetchGoldPrice = async () => {
            try {
                setLoading(true);

                // Alpha Vantage API
                const response = await fetch(
                    `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=XAU&to_currency=USD&apikey=${API_KEY}`
                );

                const data = await response.json();
                const rate = data['Realtime Currency Exchange Rate'];

                if (!rate) {
                    throw new Error('API 返回数据错误');
                }

                const currentPrice = parseFloat(rate['5. Exchange Rate']);

                setPriceData({
                    current: currentPrice,
                    change: 0, // 需要存储前一个价格来计算
                    changePercent: 0,
                    high: currentPrice,
                    low: currentPrice,
                    lastUpdate: new Date(rate['6. Last Refreshed'])
                });

                setLoading(false);
            } catch (err) {
                console.error('获取黄金价格失败:', err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchGoldPrice();

        // 每5分钟更新一次（避免超过API限制）
        const interval = setInterval(fetchGoldPrice, 5 * 60 * 1000);

        return () => clearInterval(interval);
    }, []);

    if (loading) {
        return (
            <div className="bg-black/80 backdrop-blur-lg rounded-lg p-4 shadow-xl border-2 border-yellow-900/50">
                <div className="text-yellow-500">加载中...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-black/80 backdrop-blur-lg rounded-lg p-4 shadow-xl border-2 border-red-900/50">
                <div className="text-red-500">错误: {error}</div>
            </div>
        );
    }

    // ... 其余显示代码保持不变
}
```

---

## ⚠️ 注意事项

1. **API Key 安全**：
   - 不要把 API Key 提交到 Git
   - 使用环境变量存储：`const API_KEY = import.meta.env.VITE_API_KEY;`

2. **请求频率**：
   - 遵守 API 的请求限制
   - 建议至少间隔 1-5 分钟更新

3. **错误处理**：
   - 添加 try-catch 捕获错误
   - 显示友好的错误提示

4. **数据缓存**：
   - 可以使用 localStorage 缓存数据
   - 避免重复请求

---

## 📚 其他可添加的信息源

### 新闻 RSS
- **BBC News RSS**: `https://feeds.bbci.co.uk/news/rss.xml`
- **36氪**: `https://36kr.com/feed`

### 天气 API
- **OpenWeatherMap**: https://openweathermap.org/api (免费)

### 加密货币价格
- **CoinGecko API**: https://www.coingecko.com/en/api (免费)

---

## 🎯 下一步

1. 注册一个免费 API Key
2. 替换 `GoldPrice.jsx` 中的模拟数据代码
3. 测试是否能正常获取数据
4. 根据需要调整更新频率

有问题随时问我！
