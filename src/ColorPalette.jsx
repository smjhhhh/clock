function ColorPalette() {
    const palettes = [
        {
            name: "当前：深色科技风",
            bg: "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900",
            title: "bg-gradient-to-r from-cyan-400 to-blue-500",
            colors: ["#0f172a", "#1e293b", "#0f172a"]
        },
        {
            name: "A. 极简黑白风",
            bg: "bg-gradient-to-br from-black via-gray-900 to-gray-800",
            title: "bg-white",
            colors: ["#000000", "#111827", "#1f2937"]
        },
        {
            name: "B. 深蓝科技风",
            bg: "bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950",
            title: "bg-gradient-to-r from-blue-400 to-cyan-300",
            colors: ["#172554", "#1e3a8a", "#1e1b4b"]
        },
        {
            name: "C. 暗黑赛博朋克风",
            bg: "bg-gradient-to-br from-purple-950 via-fuchsia-950 to-black",
            title: "bg-gradient-to-r from-pink-500 to-yellow-400",
            colors: ["#3b0764", "#4a044e", "#000000"]
        },
        {
            name: "D. 极光风",
            bg: "bg-gradient-to-br from-black via-blue-950 to-purple-950",
            title: "bg-gradient-to-r from-green-400 via-cyan-400 to-purple-500",
            colors: ["#000000", "#172554", "#3b0764"]
        }
    ];

    return (
        <div className="w-full max-w-4xl mx-auto p-8">
            <h2 className="text-3xl font-bold mb-8 text-center">配色方案预览</h2>

            <div className="space-y-6">
                {palettes.map((palette, index) => (
                    <div key={index} className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
                        <h3 className="text-xl font-semibold mb-4">{palette.name}</h3>

                        {/* 背景色块 */}
                        <div className="mb-3">
                            <p className="text-sm mb-2 text-gray-300">背景渐变：</p>
                            <div className={`${palette.bg} h-24 rounded-lg border-2 border-white/20`}></div>
                        </div>

                        {/* 颜色值展示 */}
                        <div className="flex gap-2 mb-3">
                            {palette.colors.map((color, i) => (
                                <div key={i} className="flex-1">
                                    <div
                                        className="h-12 rounded border-2 border-white/20"
                                        style={{ backgroundColor: color }}
                                    ></div>
                                    <p className="text-xs mt-1 text-center text-gray-400">{color}</p>
                                </div>
                            ))}
                        </div>

                        {/* 标题样式预览 */}
                        <div>
                            <p className="text-sm mb-2 text-gray-300">标题效果：</p>
                            <div className={`${palette.title} ${palette.title.includes('gradient') ? 'bg-clip-text text-transparent' : ''} text-3xl font-bold`}>
                                我的时钟应用
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ColorPalette;
