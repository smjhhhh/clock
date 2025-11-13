import { useState, useRef, useEffect } from 'react';

function OllamaChat() {
    const [messages, setMessages] = useState([
        { role: 'assistant', content: '👋 本地 AI 助手已连接。输入你的问题...' }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [ollamaStatus, setOllamaStatus] = useState('checking');
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    // 检查 Ollama 是否运行
    useEffect(() => {
        checkOllamaStatus();
    }, []);

    const checkOllamaStatus = async () => {
        try {
            const response = await fetch('http://localhost:11434/api/tags');
            if (response.ok) {
                setOllamaStatus('connected');
            } else {
                setOllamaStatus('error');
            }
        } catch (error) {
            setOllamaStatus('offline');
        }
    };

    // 自动滚动到底部
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

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
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: 'llama3.2:latest', // 使用你本地的模型
                    prompt: userMessage,
                    stream: false
                })
            });

            if (!response.ok) {
                throw new Error('Ollama API 请求失败');
            }

            const data = await response.json();
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: data.response
            }]);
        } catch (error) {
            console.error('Error:', error);
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: `❌ 错误: ${error.message}\n\n请确保 Ollama 正在运行：ollama serve`
            }]);
        } finally {
            setLoading(false);
            inputRef.current?.focus();
        }
    };

    const clearChat = () => {
        setMessages([
            { role: 'assistant', content: '👋 聊天已清空。有什么可以帮你的？' }
        ]);
    };

    return (
        <div className="bg-black/90 backdrop-blur-lg rounded-lg shadow-2xl border-2 border-green-700/50 flex flex-col h-[600px] w-full max-w-2xl">
            {/* 头部 */}
            <div className="flex items-center justify-between p-4 border-b border-green-700/30">
                <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                        ollamaStatus === 'connected' ? 'bg-green-500 animate-pulse' :
                        ollamaStatus === 'offline' ? 'bg-red-500' :
                        'bg-yellow-500'
                    }`}></div>
                    <h3 className="text-green-400 font-bold font-mono">
                        🤖 LOCAL AI TERMINAL
                    </h3>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={checkOllamaStatus}
                        className="text-xs text-green-500 hover:text-green-300 px-2 py-1 border border-green-700/50 rounded"
                        title="检查连接"
                    >
                        🔄
                    </button>
                    <button
                        onClick={clearChat}
                        className="text-xs text-green-500 hover:text-green-300 px-2 py-1 border border-green-700/50 rounded"
                        title="清空聊天"
                    >
                        🗑️
                    </button>
                </div>
            </div>

            {/* 状态提示 */}
            {ollamaStatus === 'offline' && (
                <div className="bg-red-900/30 border-b border-red-700/30 p-3 text-sm text-red-300">
                    ⚠️ Ollama 未运行。请在终端运行: <code className="bg-black/50 px-2 py-1 rounded">ollama serve</code>
                </div>
            )}

            {/* 消息区域 */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 font-mono text-sm">
                {messages.map((msg, idx) => (
                    <div
                        key={idx}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div className={`max-w-[80%] rounded-lg p-3 ${
                            msg.role === 'user'
                                ? 'bg-green-900/30 text-green-100 border border-green-700/50'
                                : 'bg-gray-900/50 text-gray-200 border border-gray-700/50'
                        }`}>
                            <div className="text-xs opacity-60 mb-1">
                                {msg.role === 'user' ? '> USER' : '> AI'}
                            </div>
                            <div className="whitespace-pre-wrap">{msg.content}</div>
                        </div>
                    </div>
                ))}

                {loading && (
                    <div className="flex justify-start">
                        <div className="bg-gray-900/50 text-gray-400 border border-gray-700/50 rounded-lg p-3">
                            <div className="flex items-center gap-2">
                                <div className="flex gap-1">
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                </div>
                                <span>AI 正在思考...</span>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* 输入区域 */}
            <form onSubmit={sendMessage} className="p-4 border-t border-green-700/30">
                <div className="flex gap-2">
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="输入消息... (按 Enter 发送)"
                        className="flex-1 bg-black/50 text-green-400 border border-green-700/50 rounded px-4 py-2 focus:outline-none focus:border-green-500 font-mono placeholder-green-700"
                        disabled={loading || ollamaStatus === 'offline'}
                    />
                    <button
                        type="submit"
                        disabled={loading || !input.trim() || ollamaStatus === 'offline'}
                        className="bg-green-900/50 hover:bg-green-800/70 text-green-300 px-6 py-2 rounded border border-green-700/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-mono font-bold"
                    >
                        发送
                    </button>
                </div>
                <div className="text-xs text-green-700 mt-2">
                    提示: 确保 Ollama 运行中，并且已下载模型 (ollama pull llama3.2)
                </div>
            </form>
        </div>
    );
}

export default OllamaChat;
