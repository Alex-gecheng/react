# react   状态驱动的ui

### 1.1创建项目

```bash
npm create vite@latest first_app
选择  react + ts
```

<img src="C:/Users/lyp/AppData/Roaming/Typora/typora-user-images/image-20260304140611801.png" alt="image-20260304140611801" style="zoom: 50%;" /><img src="https://raw.githubusercontent.com/Alex-gecheng/Typora_images/main/img/image-20260304140628139.png" alt="image-20260304140628139" style="zoom: 50%;" />

原始界面

![image-20260304140744237](https://raw.githubusercontent.com/Alex-gecheng/Typora_images/main/img/image-20260304140744237.png)

---

项目初始目录结构

![image-20260304141028783](https://raw.githubusercontent.com/Alex-gecheng/Typora_images/main/img/image-20260304141028783.png)

````
FIRST_APP
├── node_modules   /存放所有安装的依赖包,npm自动生成  
├── public         /静态资源，比如图片，不会被打包，可直接访问
│   └── vite.svg   /<img src="/vite.svg" />
├── src            /开发目录
│   ├── assets     /会被打包的静态资源，使用时需要import
│   │   └── react.svg   /import logo from './assets/react.svg'
│   ├── App.css
│   ├── App.tsx     /页面的根组件
│   ├── index.css  
│   └── main.tsx    /项目入口文件，把App 渲染到 index.html
├── .gitignore
├── eslint.config.js  /ESLint 代码规范配置文件
├── index.html       /Vite 入口页面
├── package-lock.json
├── package.json     /项目配置核心文件
├── README.md
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts    /Vite 配置文件，配置端口和代理
````

* 打包和不打包有什么区别？

  组件用到的图片 → 放 `src/assets `   可以被import ,浏览器缓存更新不会出问题,没用到不会被打包

  页面全局静态文件 → 放 `public`        图标

* 单页应用（SPA）

  只有一个 `index.html`，只有一个root挂载点，react控制页面内容，根据不同的路由渲染不同的组件

### 1.2 安装模块库

```
npm install react-router-dom
```

### 1.3实现页面切换

1.main.tsx

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import './index.css'
import App from './App.tsx'

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
// BrowserRouter 控制组件切换
```

2.app.tsx

```tsx
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";

function App(){
  return (
    <>
      <nav>
        <Link to="/">首页</Link> | 
        <Link to="/about">关于</Link> | 
        <Link to="/contact">联系</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
}
```

3.pages中写对应的页面

### 1.4组件Components和hooks

组件  某一块界面和逻辑

```
import { useTime } from "../hooks/useTime";

export default function TimeCard() {
  const time = useTime();

  return (
    <div style={{
      border: "1px solid #ccc",
      padding: "20px",
      borderRadius: "10px",
      width: "250px"
    }}>
      <h3>⏰ 当前时间</h3>
      <p>{time.toLocaleTimeString()}</p>
    </div>
  );
}
```



hooks  可复用的状态逻辑

- 保存状态
- 状态改变时自动刷新 UI
- 控制副作用 
- 主要抽离出来可复用 

```
import { useState,useEffect } from "react";
// 自定义 Hook：useTime 1s更新一次时间
export function useTime() {
    // const [状态变量, 修改状态的函数] = useState(初始值)
    const [time, setTime] = useState(new Date());
    // 副作用:定时器,请求,订阅,操作DOM,事件监听
    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(timer);     //避免定时器会一直运行,内存泄漏
    }, []);

    return time;
}
```

使用组件

```
import TimeCard  from "../components/timeCard";
export default function Home() {
  return (
    <div>
      <h1>🏠 首页</h1>
      <TimeCard />
      <p>欢迎来到我的网站！这是首页内容。</p>
    </div>
  );
}
```

###  1.5 状态管理

```
npm install zustand
```

之前的状态`const [count, setCount] = useState(0);` 只能在当前组件使用，组件间传值需要使用props，多层传值不方便

* 全局状态管理工具 Zustand     实现多个组件共享状态

`src/store/useCounterStore.ts`

```
import { create } from "zustand";

type CounterState = {
  count: number;
  increase: () => void;
  decrease: () => void;
};

export const useCounterStore = create<CounterState>((set) => ({
  count: 0,

  increase: () => set((state) => ({ count: state.count + 1 })),

  decrease: () => set((state) => ({ count: state.count - 1 })),
}));
```

在home和about中都引入count，数字保持不变，状态共享

```
const count = useCounterStore((state) => state.count);
<h2>Count: {count}</h2>
<button onClick={increase}>+1</button>
<button onClick={decrease}>-1</button>
```

