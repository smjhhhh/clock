import { useState, useRef, useEffect } from 'react';

function FloatingAI() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'assistant', content: '👋 本地 AI 助手。有什么可以帮你？' }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [ollamaStatus, setOllamaStatus] = useState('checking');
    const [selectedModel, setSelectedModel] = useState('qwen:latest');
    const [availableModels, setAvailableModels] = useState([]);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    // 检查 Ollama 状态
    useEffect(() => {
        checkOllamaStatus();
        const interval = setInterval(checkOllamaStatus, 30000); // 每30秒检查一次
        return () => clearInterval(interval);
    }, []);

    const checkOllamaStatus = async () => {
        try {
            const response = await fetch('http://localhost:11434/api/tags');
            if (response.ok) {
                setOllamaStatus('connected');
                const data = await response.json();
                // 提取模型名称并过滤掉 embedding 模型
                const models = data.models
                    .filter(m => !m.name.includes('embed'))
                    .map(m => m.name);
                setAvailableModels(models);
                // 如果当前选择的模型不在列表中，选择第一个
                if (models.length > 0 && !models.includes(selectedModel)) {
                    setSelectedModel(models[0]);
                }
            } else {
                setOllamaStatus('error');
            }
        } catch (error) {
            setOllamaStatus('offline');
        }
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim() || loading) return;

        const userMessage = input.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setLoading(true);

        try {
            const response = await fetch('http://localhost:11434/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model: selectedModel,
                    prompt: userMessage,
                    system: '你是一个有帮助的 AI 助手，通过 Ollama 在本地运行，保护用户隐私。',
                    stream: false
                })
            });

            if (!response.ok) throw new Error('API 请求失败');

            const data = await response.json();
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: data.response
            }]);
        } catch (error) {
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: `❌ 错误: ${error.message}\n\n确保 Ollama 运行中: ollama serve`
            }]);
        } finally {
            setLoading(false);
        }
    };

    const clearChat = () => {
        setMessages([{ role: 'assistant', content: '👋 聊天已清空。' }]);
    };

    return (
        <>
            {/* 聊天窗口 */}
            {isOpen && (
                <div className="w-96 h-[500px] bg-black/95 backdrop-blur-lg rounded-lg shadow-2xl border-2 border-green-700/50 flex flex-col mb-4">
                    {/* 头部 */}
                    <div className="p-3 border-b border-green-700/30">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${
                                    ollamaStatus === 'connected' ? 'bg-green-500 animate-pulse' :
                                    ollamaStatus === 'offline' ? 'bg-red-500' : 'bg-yellow-500'
                                }`}></div>
                                <h3 className="text-green-400 font-bold text-sm font-mono">AI 助手</h3>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={checkOllamaStatus}
                                    className="text-green-500 hover:text-green-300 text-xs"
                                    title="刷新连接"
                                >
                                    🔄
                                </button>
                                <button
                                    onClick={clearChat}
                                    className="text-green-500 hover:text-green-300 text-xs"
                                    title="清空"
                                >
                                    🗑️
                                </button>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="text-green-500 hover:text-green-300 text-xs"
                                    title="关闭"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>
                        {/* 模型选择器 */}
                        {availableModels.length > 0 && (
                            <select
                                value={selectedModel}
                                onChange={(e) => setSelectedModel(e.target.value)}
                                className="w-full bg-black/50 text-green-400 border border-green-700/50 rounded px-2 py-1 text-xs focus:outline-none focus:border-green-500 font-mono"
                                disabled={ollamaStatus !== 'connected'}
                            >
                                {availableModels.map(model => (
                                    <option key={model} value={model}>{model}</option>
                                ))}
                            </select>
                        )}
                    </div>

                    {/* 状态提示 */}
                    {ollamaStatus === 'offline' && (
                        <div className="bg-red-900/30 border-b border-red-700/30 p-2 text-xs text-red-300">
                            ⚠️ Ollama 未运行
                        </div>
                    )}

                    {/* 消息区 */}
                    <div className="flex-1 overflow-y-auto p-3 space-y-2 text-sm">
                        {messages.map((msg, idx) => (
                            <div
                                key={idx}
                                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div className={`max-w-[85%] rounded-lg p-2 text-xs ${
                                    msg.role === 'user'
                                        ? 'bg-green-900/40 text-green-100 border border-green-700/50'
                                        : 'bg-gray-900/60 text-gray-200 border border-gray-700/50'
                                }`}>
                                    <div className="font-mono opacity-60 text-[10px] mb-1">
                                        {msg.role === 'user' ? 'YOU' : 'AI'}
                                    </div>
                                    <div className="whitespace-pre-wrap">{msg.content}</div>
                                </div>
                            </div>
                        ))}

                        {loading && (
                            <div className="flex justify-start">
                                <div className="bg-gray-900/60 border border-gray-700/50 rounded-lg p-2 text-xs">
                                    <div className="flex items-center gap-2">
                                        <div className="flex gap-1">
                                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce"></div>
                                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                        </div>
                                        <span className="text-gray-400">思考中...</span>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* 输入区 */}
                    <form onSubmit={sendMessage} className="p-3 border-t border-green-700/30">
                        <div className="flex gap-2">
                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="输入消息..."
                                className="flex-1 bg-black/50 text-green-400 border border-green-700/50 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-green-500 font-mono placeholder-green-700"
                                disabled={loading || ollamaStatus === 'offline'}
                            />
                            <button
                                type="submit"
                                disabled={loading || !input.trim() || ollamaStatus === 'offline'}
                                className="bg-green-900/50 hover:bg-green-800/70 text-green-300 px-3 py-1.5 rounded border border-green-700/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm font-mono"
                            >
                                ➤
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* 浮动按钮 */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-14 h-14 bg-gradient-to-br from-green-600 to-green-800 hover:from-green-500 hover:to-green-700 text-white rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 border-2 border-green-400/50"
                title="AI 助手"
            >
                {isOpen ? (
                    <span className="text-xl">✕</span>
                ) : (
                    <div className="relative">
                        <span className="text-2xl">🤖</span>
                        {ollamaStatus === 'connected' && (
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                        )}
                    </div>
                )}
            </button>
        </>
    );
}

export default FloatingAI;
