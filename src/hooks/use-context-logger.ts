import { useEffect, useRef } from "react";

// カラー設定
const colors: Record<string, string> = {
  prefix: "#4CAF50",
  log: "inherit",
  prev: "#9E9E9E",
  next: "#03A9F4",
  error: "#F20404",
};

// 入力の型定義
type Inputs = Record<string, any>;

// タイムスタンプを生成するヘルパー関数
function getTimestamp(): string {
  const date = new Date();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  const milliseconds = date.getMilliseconds().toString().padStart(3, "0");
  return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

// useContextLogger フックの定義
export function useContextLogger<T extends Inputs>(prefix: string, inputs: T): void {
  // 前回の入力値を保持するための Ref
  const prevInputs = useRef<Partial<Record<keyof T, any>>>({});

  useEffect(() => {
    const timestamp = getTimestamp();

    console.group(
      `%c[${prefix}] %cContext Update %c@${timestamp}`,
      `color: ${colors.prefix}`,
      `color: ${colors.log}; font-weight: bold;`,
      "color: gray; font-weight: lighter;"
    );

    // 各入力の前後の値をログに出力
    (Object.keys(inputs) as Array<keyof T>).forEach((key) => {
      const value = inputs[key];
      const prev = prevInputs.current[key];

      console.log(`%c${String(key)} - prev`, `color: ${colors.prev}`, prev);
      console.log(`%c${String(key)} - next`, `color: ${colors.next}`, value);

      // 現在の値を前回の値として更新
      prevInputs.current[key] = value;
    });

    console.groupEnd();
  }, [prefix, inputs]); // prefix と inputs に依存
}
