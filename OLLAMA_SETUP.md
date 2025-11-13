# Ollama 本地 AI 接入指南

## 🤖 什么是 Ollama？

Ollama 是一个可以在本地运行大语言模型（LLM）的工具，类似于 ChatGPT，但完全在你的电脑上运行：
- ✅ 完全离线，数据私密
- ✅ 免费使用
- ✅ 支持多种模型（Llama, Mistral, Qwen 等）
- ✅ REST API 接口

---

## 📦 安装 Ollama

### macOS
```bash
brew install ollama
```

### 或者从官网下载
访问：https://ollama.com/download

---

## 🚀 启动 Ollama

### 1. 启动服务
```bash
ollama serve
```

**默认运行在：** `http://localhost:11434`

### 2. 下载模型

在另一个终端窗口：

```bash
# 推荐：Llama 3.2（3B 参数，速度快）
ollama pull llama3.2

# 或者其他模型：
ollama pull llama3.2:1b     # 更小，更快
ollama pull llama3.2:3b     # 默认
ollama pull qwen2.5:latest  # 中文更好
ollama pull mistral:latest  # 英文好
```

**查看已安装的模型：**
```bash
ollama list
```

---

## 🎨 使用 AI 聊天

1. **启动 Ollama 服务**
   ```bash
   ollama serve
   ```

2. **访问你的网站**
   - 主页：http://localhost:5173/clock/#/
   - 点击右上角 "🤖 本地AI" 按钮

3. **开始聊天！**
   - 绿色圆点 = 已连接
   - 红色圆点 = Ollama 未运行
   - 黄色圆点 = 检查中

---

## 🔧 配置模型

默认使用 `llama3.2:latest` 模型。

**修改模型：**

编辑 `src/components/OllamaChat.jsx` 第 39 行：

```javascript
body: JSON.stringify({
    model: 'llama3.2:latest', // 改成你想要的模型
    prompt: userMessage,
    stream: false
})
```

**可用模型：**
- `llama3.2:latest` - Meta 的 Llama 3.2
- `llama3.2:1b` - 更小更快的版本
- `qwen2.5:latest` - 阿里的通义千问（中文好）
- `mistral:latest` - Mistral AI
- `codellama:latest` - 专门用于代码

---

## 💡 高级功能

### 启用流式输出（打字机效果）

修改 `OllamaChat.jsx`：

```javascript
// 改 stream: false 为 stream: true
body: JSON.stringify({
    model: 'llama3.2:latest',
    prompt: userMessage,
    stream: true  // 启用流式输出
})
```

然后需要修改接收逻辑来处理流式响应。

### 添加系统提示（System Prompt）

```javascript
body: JSON.stringify({
    model: 'llama3.2:latest',
    prompt: userMessage,
    system: '你是一个专业的编程助手，擅长 React 和 JavaScript。',
    stream: false
})
```

---

## 🐛 常见问题

### 1. 连接失败（红色圆点）

**检查 Ollama 是否运行：**
```bash
curl http://localhost:11434/api/tags
```

如果返回错误，运行：
```bash
ollama serve
```

### 2. CORS 错误

Ollama 默认允许本地访问，不应该有 CORS 问题。

如果有问题，设置环境变量：
```bash
export OLLAMA_ORIGINS="*"
ollama serve
```

### 3. 模型未找到

下载模型：
```bash
ollama pull llama3.2
```

查看已安装：
```bash
ollama list
```

### 4. 响应很慢

- 使用更小的模型：`llama3.2:1b`
- 或者升级硬件（需要较好的 CPU/GPU）

---

## 📊 性能要求

| 模型 | 大小 | 最低内存 | 速度 |
|------|------|----------|------|
| llama3.2:1b | 1.3 GB | 4 GB | ⚡⚡⚡ 很快 |
| llama3.2:3b | 2 GB | 8 GB | ⚡⚡ 快 |
| llama3.2:latest | 8 GB | 16 GB | ⚡ 中等 |
| qwen2.5:7b | 4.7 GB | 12 GB | ⚡ 中等 |

---

## 🎯 推荐配置

**开发环境：**
- 模型：`llama3.2:1b`（最快）
- 内存：4GB+
- 适合快速测试

**日常使用：**
- 模型：`llama3.2:latest` 或 `qwen2.5:latest`
- 内存：8GB+
- 质量更好

**中文优化：**
- 模型：`qwen2.5:latest`
- 阿里开源，中文理解最好

---

## 🔗 有用的链接

- Ollama 官网：https://ollama.com
- 模型库：https://ollama.com/library
- GitHub：https://github.com/ollama/ollama
- API 文档：https://github.com/ollama/ollama/blob/main/docs/api.md

---

## 🚀 下一步

接入成功后，可以考虑：

1. **添加历史记录** - 保存对话到 Supabase
2. **多模型切换** - UI 中选择不同模型
3. **流式输出** - 实现打字机效果
4. **代码高亮** - 美化 AI 返回的代码
5. **语音输入** - Web Speech API
6. **导出对话** - 导出为 Markdown

需要实现这些功能吗？告诉我！
