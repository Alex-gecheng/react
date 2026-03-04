import TimeCard  from "../components/timeCard";
import { useCounterStore } from "../store/useCounterStore";
export default function Home() {
  const { count, increase, decrease } = useCounterStore();
  return (
    <div>
      <h1>🏠 首页</h1>
      <TimeCard />
      <h2>Count: {count}</h2>

      <button onClick={increase}>+1</button>
      <button onClick={decrease}>-1</button>
      <p>欢迎来到我的网站！这是首页内容。</p>
    </div>
  );
}