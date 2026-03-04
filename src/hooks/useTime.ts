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