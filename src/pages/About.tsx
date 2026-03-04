import { useCounterStore } from "../store/useCounterStore";
export default function About() {
  const { count, increase, decrease } = useCounterStore();
  return (
    <div>
      <h1>📖 关于页面</h1>
      <h2>Count: {count}</h2>

      <button onClick={increase}>+1</button>
      <button onClick={decrease}>-1</button>
      <p>这是关于我的介绍页面，可以写项目背景或者个人信息。</p>
    </div>
  );
}