function GoldPrice() {
    return (
        <div className="bg-black/80 backdrop-blur-lg rounded-lg p-3 shadow-2xl border-2 border-purple-900/50">
            {/* 市场热力图 - 超大版 */}
            <div className="rounded overflow-hidden">
                <iframe
                    src="https://s.tradingview.com/embed-widget/stock-heatmap/?exchanges%5B%5D=US&dataSource=SPX500&grouping=sector&blockSize=market_cap_basic&blockColor=change&hasTopBar=false&isDataSetEnabled=false&isZoomEnabled=true&hasSymbolTooltip=true&width=1200&height=900&colorTheme=dark&locale=zh_CN"
                    className="w-[1200px] h-[900px]"
                    title="Stock Market Heatmap"
                    style={{ border: 'none' }}
                    frameBorder="0"
                ></iframe>
            </div>
        </div>
    );
}

export default GoldPrice;
