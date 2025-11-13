import { useEffect, useRef } from 'react';

function MatrixRain() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // 设置canvas尺寸为全屏
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // 字符：0和1
        const chars = '01';
        const fontSize = 14;
        const columns = canvas.width / fontSize;

        // 每列的y位置
        const drops = [];
        for (let i = 0; i < columns; i++) {
            drops[i] = Math.random() * canvas.height / fontSize;
        }

        function draw() {
            // 半透明黑色背景，产生拖尾效果
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // 设置文字颜色和字体
            ctx.fillStyle = '#0F0'; // 亮绿色
            ctx.font = fontSize + 'px monospace';

            // 绘制字符
            for (let i = 0; i < drops.length; i++) {
                // 随机选择0或1
                const text = chars[Math.floor(Math.random() * chars.length)];
                const x = i * fontSize;
                const y = drops[i] * fontSize;

                ctx.fillText(text, x, y);

                // 随机重置或继续下落
                if (y > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }

                drops[i]++;
            }
        }

        const interval = setInterval(draw, 33);

        // 窗口大小改变时重新设置
        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', handleResize);

        return () => {
            clearInterval(interval);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 -z-10"
            style={{ background: '#000' }}
        />
    );
}

export default MatrixRain;
