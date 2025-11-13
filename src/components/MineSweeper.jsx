import { useState, useEffect } from 'react';

function MineSweeper() {
    const ROWS = 9;
    const COLS = 9;
    const MINES = 10;

    const [board, setBoard] = useState([]);
    const [gameStatus, setGameStatus] = useState('playing'); // playing, won, lost
    const [flagCount, setFlagCount] = useState(0);
    const [aiThinking, setAiThinking] = useState(false);
    const [aiSuggestion, setAiSuggestion] = useState('');

    // 初始化游戏
    useEffect(() => {
        initGame();
    }, []);

    const initGame = () => {
        // 创建空白网格
        const newBoard = Array(ROWS).fill(null).map(() =>
            Array(COLS).fill(null).map(() => ({
                isMine: false,
                isRevealed: false,
                isFlagged: false,
                neighborMines: 0
            }))
        );

        // 随机放置地雷
        let minesPlaced = 0;
        while (minesPlaced < MINES) {
            const row = Math.floor(Math.random() * ROWS);
            const col = Math.floor(Math.random() * COLS);
            if (!newBoard[row][col].isMine) {
                newBoard[row][col].isMine = true;
                minesPlaced++;
            }
        }

        // 计算每个格子周围的地雷数
        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                if (!newBoard[r][c].isMine) {
                    let count = 0;
                    for (let dr = -1; dr <= 1; dr++) {
                        for (let dc = -1; dc <= 1; dc++) {
                            const nr = r + dr;
                            const nc = c + dc;
                            if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && newBoard[nr][nc].isMine) {
                                count++;
                            }
                        }
                    }
                    newBoard[r][c].neighborMines = count;
                }
            }
        }

        setBoard(newBoard);
        setGameStatus('playing');
        setFlagCount(0);
        setAiSuggestion(''); // 清空 AI 建议
    };

    // 揭开格子
    const revealCell = (row, col) => {
        if (gameStatus !== 'playing') return;
        if (board[row][col].isRevealed || board[row][col].isFlagged) return;

        const newBoard = JSON.parse(JSON.stringify(board));

        if (newBoard[row][col].isMine) {
            // 游戏失败
            revealAllMines(newBoard);
            setBoard(newBoard);
            setGameStatus('lost');
            return;
        }

        // 揭开当前格子
        revealCellRecursive(newBoard, row, col);
        setBoard(newBoard);

        // 检查是否获胜
        checkWin(newBoard);
    };

    const revealCellRecursive = (board, row, col) => {
        if (row < 0 || row >= ROWS || col < 0 || col >= COLS) return;
        if (board[row][col].isRevealed || board[row][col].isMine) return;

        board[row][col].isRevealed = true;

        // 如果周围没有地雷，递归揭开相邻格子
        if (board[row][col].neighborMines === 0) {
            for (let dr = -1; dr <= 1; dr++) {
                for (let dc = -1; dc <= 1; dc++) {
                    revealCellRecursive(board, row + dr, col + dc);
                }
            }
        }
    };

    const revealAllMines = (board) => {
        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                if (board[r][c].isMine) {
                    board[r][c].isRevealed = true;
                }
            }
        }
    };

    const toggleFlag = (e, row, col) => {
        e.preventDefault();
        if (gameStatus !== 'playing') return;
        if (board[row][col].isRevealed) return;

        const newBoard = JSON.parse(JSON.stringify(board));
        newBoard[row][col].isFlagged = !newBoard[row][col].isFlagged;
        setFlagCount(prev => newBoard[row][col].isFlagged ? prev + 1 : prev - 1);
        setBoard(newBoard);
    };

    const checkWin = (board) => {
        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                if (!board[r][c].isMine && !board[r][c].isRevealed) {
                    return; // 还有非地雷格子未揭开
                }
            }
        }
        setGameStatus('won');
    };

    // 将棋盘状态转换成文本供 AI 分析
    const getBoardStateText = () => {
        let text = '扫雷棋盘状态 (9x9, 10个地雷):\n\n';
        text += '   ';
        for (let c = 0; c < COLS; c++) {
            text += c + ' ';
        }
        text += '\n';

        for (let r = 0; r < ROWS; r++) {
            text += r + '  ';
            for (let c = 0; c < COLS; c++) {
                const cell = board[r][c];
                if (cell.isFlagged) {
                    text += 'F '; // 已标记
                } else if (!cell.isRevealed) {
                    text += '? '; // 未揭开
                } else if (cell.neighborMines > 0) {
                    text += cell.neighborMines + ' '; // 显示数字
                } else {
                    text += '0 '; // 空白
                }
            }
            text += '\n';
        }

        text += `\n剩余地雷数: ${MINES - flagCount}\n`;
        text += '\n图例: ? = 未揭开, F = 已标记为地雷, 0 = 空白, 1-8 = 周围地雷数\n\n';
        text += '请你作为扫雷顾问，分析当前棋盘状态：\n\n';
        text += '1. 观察数字格：\n';
        text += '   - 如果数字格周围未揭开格子数 = 该数字，则那些都是地雷\n';
        text += '   - 如果数字格周围已标记地雷数 = 该数字，则其他未揭开格子安全\n\n';
        text += '2. 给出建议：\n';
        text += '   - 优先推荐 100% 安全的格子\n';
        text += '   - 或推荐标记确定的地雷\n\n';
        text += '你的回答格式：\n';
        text += '简短分析 + 建议操作\n\n';
        text += '最后一行必须是：REVEAL: [row] [col] 或 FLAG: [row] [col]\n';
        text += '例如：建议揭开左上角的安全格子。\nREVEAL: 0 1\n';

        return text;
    };

    // AI 分析并给建议
    const getAISuggestion = async () => {
        if (gameStatus !== 'playing' || aiThinking) return;

        setAiThinking(true);
        setAiSuggestion('');
        try {
            const boardState = getBoardStateText();

            const response = await fetch('http://localhost:11434/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model: 'qwen:latest', // 使用通义千问，响应更快更稳定
                    prompt: boardState,
                    stream: false
                })
            });

            if (!response.ok) throw new Error('AI 请求失败');

            const data = await response.json();
            let aiResponse = data.response;

            console.log('AI 分析:', aiResponse);

            // 提取建议操作和分析
            const match = aiResponse.match(/(REVEAL|FLAG|揭开|标记):\s*(\d+)\s+(\d+)/i);

            if (match) {
                const action = match[1];
                const row = match[2];
                const col = match[3];

                const actionText = (action === 'REVEAL' || action === '揭开') ? '揭开' : '标记';

                // 提取分析部分（在操作指令之前的内容）
                const analysisMatch = aiResponse.split(/(?:REVEAL|FLAG|揭开|标记):/i)[0].trim();
                const shortAnalysis = analysisMatch.substring(0, 150);

                setAiSuggestion(`💡 ${shortAnalysis}\n\n➡️ 建议：${actionText}坐标 (${row}, ${col})`);
            } else {
                // 如果没有找到标准格式，显示 AI 的原始建议
                const shortResponse = aiResponse.substring(0, 200);
                setAiSuggestion(`💡 AI 分析：${shortResponse}${aiResponse.length > 200 ? '...' : ''}`);
            }
        } catch (error) {
            console.error('AI 出错:', error);
            setAiSuggestion('❌ AI 分析失败，请重试');
        } finally {
            setAiThinking(false);
        }
    };

    const getCellContent = (cell) => {
        if (!cell.isRevealed) {
            return cell.isFlagged ? '🚩' : '';
        }
        if (cell.isMine) {
            return '💣';
        }
        return cell.neighborMines > 0 ? cell.neighborMines : '';
    };

    const getCellColor = (cell) => {
        if (!cell.isRevealed) return 'text-green-400';
        if (cell.isMine) return 'text-red-500';
        const colors = ['', 'text-blue-400', 'text-green-500', 'text-red-400', 'text-purple-400', 'text-yellow-400', 'text-pink-400', 'text-cyan-400', 'text-orange-400'];
        return colors[cell.neighborMines] || 'text-gray-400';
    };

    return (
        <div className="flex flex-col items-center gap-3">
            {/* 游戏信息 */}
            <div className="flex items-center justify-between w-full px-2">
                <div className="text-green-400 font-mono text-sm">
                    💣 剩余: {MINES - flagCount}
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={getAISuggestion}
                        disabled={gameStatus !== 'playing' || aiThinking}
                        className="bg-purple-900/50 hover:bg-purple-800/70 text-purple-300 px-3 py-1 rounded border border-purple-700/50 font-mono text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        title="让 AI 分析棋盘"
                    >
                        {aiThinking ? '🤔 分析中...' : '🤖 AI 分析'}
                    </button>
                    <button
                        onClick={initGame}
                        className="bg-green-900/50 hover:bg-green-800/70 text-green-300 px-3 py-1 rounded border border-green-700/50 font-mono text-sm transition-all"
                    >
                        🔄 重新开始
                    </button>
                </div>
                <div className="text-green-400 font-mono text-sm">
                    {gameStatus === 'won' && '🎉 胜利!'}
                    {gameStatus === 'lost' && '💥 失败!'}
                    {gameStatus === 'playing' && '⏱️ 进行中'}
                </div>
            </div>

            {/* AI 建议显示 */}
            {aiSuggestion && (
                <div className="w-full px-3 py-2 bg-purple-900/20 border border-purple-700/30 rounded text-purple-200 font-mono text-xs whitespace-pre-line">
                    {aiSuggestion}
                </div>
            )}

            {/* 游戏面板 */}
            <div className="inline-block bg-gray-900/50 p-2 rounded border border-green-700/30">
                {/* 列坐标 */}
                <div className="flex ml-6">
                    {Array(COLS).fill(0).map((_, i) => (
                        <div key={i} className="w-7 m-0.5 text-center text-xs text-cyan-400 font-mono">
                            {i}
                        </div>
                    ))}
                </div>

                {/* 棋盘 */}
                {board.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex">
                        {/* 行坐标 */}
                        <div className="w-6 h-7 m-0.5 flex items-center justify-center text-xs text-cyan-400 font-mono">
                            {rowIndex}
                        </div>

                        {/* 格子 */}
                        {row.map((cell, colIndex) => (
                            <button
                                key={`${rowIndex}-${colIndex}`}
                                onClick={() => revealCell(rowIndex, colIndex)}
                                onContextMenu={(e) => toggleFlag(e, rowIndex, colIndex)}
                                className={`w-7 h-7 m-0.5 flex items-center justify-center text-xs font-bold font-mono border transition-all ${
                                    cell.isRevealed
                                        ? 'bg-gray-800/80 border-gray-700/50 cursor-default'
                                        : 'bg-gray-900/90 border-green-700/50 hover:bg-green-900/30 cursor-pointer'
                                } ${getCellColor(cell)}`}
                            >
                                {getCellContent(cell)}
                            </button>
                        ))}
                    </div>
                ))}
            </div>

            {/* 游戏说明 */}
            <div className="text-xs text-gray-400 font-mono text-center px-2">
                左键点击揭开 | 右键标记地雷
            </div>
        </div>
    );
}

export default MineSweeper;
