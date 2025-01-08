// Context: https://qiita.com/k_tada/items/cfb9a4046984431468b7

import { useCallback } from "react";

// カラー設定
const colors: Record<string, string> = {
  prefix: "#4CAF50",
  log: "inherit",
  prev: "#9E9E9E",
  next: "#03A9F4",
  error: "#F20404",
};

// タイムスタンプを生成するヘルパー関数
function getTimestamp(): string {
  const date = new Date();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  const milliseconds = date.getMilliseconds().toString().padStart(3, "0");
  return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

// useLogger フックの定義
type LogFunction = (message: string, src?: any) => void;

export function useLogger(prefix: string): { log: LogFunction } {
  const log = useCallback<LogFunction>(
    (message, src) => {
      // 本番環境ではログを出力しない
      if (process.env.NODE_ENV === "production") {
        return;
      }

      const timestamp = getTimestamp();
      const formattedPrefix = `%c[${prefix}]`;
      const formattedMessage = `%c${message} @ %c${timestamp}`;
      const styles = [
        `color: ${colors.prefix}`,
        `color: ${colors.log}; font-weight: bold;`,
        "color: gray; font-weight: lighter;",
      ];

      if (src) {
        console.log(formattedPrefix, formattedMessage, ...styles, src);
      } else {
        console.log(formattedPrefix, formattedMessage, ...styles);
      }
    },
    [prefix]
  );

  return { log };
}
