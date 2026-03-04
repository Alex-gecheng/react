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