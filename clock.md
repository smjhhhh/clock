第一步：项目结构

  首先，让我讲解你需要创建的文件结构：

  clock/
  ├── src/
  │   ├── App.js          # 主应用组件
  │   ├── DigitalClock.js # 数字时钟组件
  │   ├── AnalogClock.js  # 模拟时钟组件
  │   ├── App.css         # 样式文件
  │   └── index.js        # 入口文件

  第二步：核心概念讲解

  React中实现时钟的关键点：

  1. 状态管理（useState）：用来存储当前时间
  2. 副作用（useEffect）：设置定时器，每秒更新时间
  3. 组件化思想：将数字时钟和模拟时钟分成两个独立组件

  数字时钟实现思路：

  // 1. 导入React hooks
  import { useState, useEffect } from 'react';

  // 2. 创建组件
  function DigitalClock() {
    // 3. 使用useState存储当前时间
    const [time, setTime] = useState(new Date());

    // 4. 使用useEffect设置定时器
    useEffect(() => {
      const timer = setInterval(() => {
        setTime(new Date());  // 每秒更新时间
      }, 1000);

      // 5. 清理函数，组件卸载时清除定时器
      return () => clearInterval(timer);
    }, []);  // 空依赖数组，只在组件挂载时运行一次

    // 6. 格式化时间显示
    const hours = time.getHours().toString().padStart(2, '0');
    const minutes = time.getMinutes().toString().padStart(2,
  '0');
    const seconds = time.getSeconds().toString().padStart(2,
  '0');

    return <div>{hours}:{minutes}:{seconds}</div>;
  }

  模拟时钟实现思路：

  模拟时钟更复杂一些，需要计算指针的旋转角度：

  // 1. 计算角度的公式
  const secondsDegrees = (seconds / 60) *360;      //
  秒针：每秒6度
  const minutesDegrees = (minutes / 60)* 360;      //
  分针：每分6度
  const hoursDegrees = (hours / 12) * 360;          //
  时针：每小时30度

  // 2. 使用CSS transform旋转指针
  <div
    className="hand hour-hand"
    style={{ transform: `rotate(${hoursDegrees}deg)` }}
  />

  关键知识点：

- Date对象方法：
  - getHours() - 获取小时（0-23）
  - getMinutes() - 获取分钟（0-59）
  - getSeconds() - 获取秒（0-59）
- CSS transform：
  - rotate() - 旋转元素
  - transform-origin - 设置旋转中心点

  你想先从哪个组件开始学习？我可以详细讲解：

  1. 数字时钟（比较简单，适合入门）
  2. 模拟时钟（涉及更多CSS和数学计算）

> 1

⏺ 很好！让我详细教你如何创建数字时钟组件。

  数字时钟组件详解

  第一步：创建基础组件结构

  首先创建一个名为 DigitalClock.js 的文件：

  import { useState, useEffect } from 'react';

  function DigitalClock() {
    return (
      <div className="digital-clock">
        <h2>数字时钟</h2>
        <div className="time-display">
          00:00:00
        </div>
      </div>
    );
  }

  export default DigitalClock;

  讲解：

- import 语句引入了React的两个Hook
- 组件就是一个返回JSX的函数
- 暂时显示固定的 "00:00:00"

  第二步：添加状态管理

  import { useState, useEffect } from 'react';

  function DigitalClock() {
    // 创建一个状态变量来存储当前时间
    const [time, setTime] = useState(new Date());

    return (
      <div className="digital-clock">
        <h2>数字时钟</h2>
        <div className="time-display">
          {time.toLocaleTimeString()}
        </div>
      </div>
    );
  }

  export default DigitalClock;

  讲解：

- useState(new Date()) 创建状态，初始值是当前时间
- time 是当前值，setTime 是更新函数
- toLocaleTimeString() 将Date对象格式化为时间字符串

  但是：这个时钟不会动，因为时间只在组件创建时获取了一次！

  第三步：添加定时器让时钟运行

  import { useState, useEffect } from 'react';

  function DigitalClock() {
    const [time, setTime] = useState(new Date());

    // 使用useEffect设置定时器
    useEffect(() => {
      // setInterval：每隔1000毫秒（1秒）执行一次
      const timer = setInterval(() => {
        setTime(new Date());  // 更新时间状态
      }, 1000);

      // 返回清理函数
      // 组件卸载时会执行，清除定时器防止内存泄漏
      return () => {
        clearInterval(timer);
      };
    }, []);  // 空数组表示只在组件挂载时执行一次

    return (
      <div className="digital-clock">
        <h2>数字时钟</h2>
        <div className="time-display">
          {time.toLocaleTimeString()}
        </div>
      </div>
    );
  }

  export default DigitalClock;

  讲解 useEffect 的工作原理：

  1. 什么时候执行：
    - 组件首次渲染后执行
    - 依赖项（第二个参数数组）变化时执行
    - [] 空数组 = 只执行一次
  2. 定时器逻辑：
  组件挂载 → useEffect执行 → 创建定时器
  ↓
  每秒触发 → setTime(new Date()) → 组件重新渲染 → 显示新时间
  3. 清理函数：
    - 防止组件卸载后定时器还在运行
    - 避免内存泄漏

  第四步：自定义时间格式

  如果你想更精确控制时间显示格式：

  import { useState, useEffect } from 'react';

  function DigitalClock() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
      const timer = setInterval(() => {
        setTime(new Date());
      }, 1000);

      return () => clearInterval(timer);
    }, []);

    // 格式化时间的函数
    const formatTime = (date) => {
      const hours = date.getHours().toString().padStart(2,
  '0');
      const minutes = date.getMinutes().toString().padStart(2,
   '0');
      const seconds = date.getSeconds().toString().padStart(2,
   '0');

      return `${hours}:${minutes}:${seconds}`;
    };

    return (
      <div className="digital-clock">
        <h2>数字时钟</h2>
        <div className="time-display">
          {formatTime(time)}
        </div>
      </div>
    );
  }

  export default DigitalClock;

  讲解格式化：

- getHours() - 获取小时（0-23）
- toString() - 转换为字符串
- padStart(2, '0') - 不足2位时在前面补0（例如：9 → 09）

  第五步：添加日期显示（可选）

  import { useState, useEffect } from 'react';

  function DigitalClock() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
      const timer = setInterval(() => {
        setTime(new Date());
      }, 1000);

      return () => clearInterval(timer);
    }, []);

    const formatTime = (date) => {
      const hours = date.getHours().toString().padStart(2,
  '0');
      const minutes = date.getMinutes().toString().padStart(2,
   '0');
      const seconds = date.getSeconds().toString().padStart(2,
   '0');
      return `${hours}:${minutes}:${seconds}`;
    };

    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = (date.getMonth() +
  1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    return (
      <div className="digital-clock">
        <h2>数字时钟</h2>
        <div className="date-display">
          {formatDate(time)}
        </div>
        <div className="time-display">
          {formatTime(time)}
        </div>
      </div>
    );
  }

  export default DigitalClock;

  注意：getMonth() 返回0-11，所以要 +1

  完整代码总结

  这就是一个完整的数字时钟组件！核心要点：

  1. useState - 存储当前时间状态
  2. useEffect - 设置每秒更新的定时器
  3. 清理函数 - 防止内存泄漏
  4. 格式化函数 - 控制显示格式

  你理解了吗？有任何疑问随时问我！接下来想学习：

- 为数字时钟添加CSS样式？
- 继续学习模拟时钟组件？
