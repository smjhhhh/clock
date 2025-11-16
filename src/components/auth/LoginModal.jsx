import { useState } from 'react';
import { supabase } from '../../lib/supabase';

function LoginModal({ isOpen, onClose }) {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mode, setMode] = useState('login'); // 'login' or 'signup'

    if (!isOpen) return null;

    const handleGitHubLogin = async () => {
        setLoading(true);
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'github',
            options: {
                redirectTo: `${window.location.origin}/gallery`
            }
        });
        if (error) {
            alert('GitHub登录失败: ' + error.message);
        }
        setLoading(false);
    };

    const handleEmailAuth = async (e) => {
        e.preventDefault();
        setLoading(true);

        const { data, error } = mode === 'login'
            ? await supabase.auth.signInWithPassword({ email, password })
            : await supabase.auth.signUp({ email, password });

        if (error) {
            alert(error.message);
        } else {
            if (mode === 'signup') {
                alert('注册成功！请检查邮箱进行验证。');
            }
            onClose();
        }
        setLoading(false);
    };

    const handleMagicLink = async (e) => {
        e.preventDefault();
        setLoading(true);

        const { error } = await supabase.auth.signInWithOtp({
            email,
            options: {
                emailRedirectTo: `${window.location.origin}/gallery`
            }
        });

        if (error) {
            alert(error.message);
        } else {
            alert('魔法链接已发送到您的邮箱！');
            onClose();
        }
        setLoading(false);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
                {/* 关闭按钮 */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {mode === 'login' ? '登录' : '注册'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                        ✕
                    </button>
                </div>

                {/* GitHub 登录（推荐） */}
                <button
                    onClick={handleGitHubLogin}
                    disabled={loading}
                    className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 rounded-lg flex items-center justify-center gap-2 mb-4 transition-colors disabled:opacity-50"
                >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    使用 GitHub 登录
                </button>

                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white dark:bg-slate-800 text-gray-500">或</span>
                    </div>
                </div>

                {/* 邮箱密码登录 */}
                <form onSubmit={handleEmailAuth} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            邮箱
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
                            placeholder="your@email.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            密码
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-lg font-semibold transition-colors disabled:opacity-50"
                    >
                        {loading ? '处理中...' : (mode === 'login' ? '登录' : '注册')}
                    </button>
                </form>

                {/* Magic Link */}
                <button
                    onClick={handleMagicLink}
                    disabled={loading || !email}
                    className="w-full mt-3 text-sm text-pink-500 hover:text-pink-600 disabled:opacity-50"
                >
                    或发送魔法链接到邮箱（无需密码）
                </button>

                {/* 切换登录/注册 */}
                <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
                    {mode === 'login' ? (
                        <>
                            还没有账号？
                            <button
                                onClick={() => setMode('signup')}
                                className="text-pink-500 hover:text-pink-600 ml-1"
                            >
                                立即注册
                            </button>
                        </>
                    ) : (
                        <>
                            已有账号？
                            <button
                                onClick={() => setMode('login')}
                                className="text-pink-500 hover:text-pink-600 ml-1"
                            >
                                登录
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default LoginModal;
