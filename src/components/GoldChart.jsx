function GoldChart() {
    return (
        <div className="bg-black/80 backdrop-blur-lg rounded-lg p-2 shadow-xl border-2 border-yellow-900/50">
            {/* 黄金价格图表 */}
            <div className="rounded overflow-hidden">
                <iframe
                    src="https://s.tradingview.com/embed-widget/mini-symbol-overview/?symbol=OANDA%3AXAUUSD&interval=D&theme=dark&style=2&locale=zh_CN&colorTheme=dark&isTransparent=false&autosize=false&width=100%25&height=220"
                    className="w-full h-56"
                    title="Gold Price Chart"
                    style={{ border: 'none' }}
                    frameBorder="0"
                ></iframe>
            </div>
        </div>
    );
}

export default GoldChart;
