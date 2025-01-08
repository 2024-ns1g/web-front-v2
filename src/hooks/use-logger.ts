import { useCallback } from "react";

/**
 * ログレベルの定義
 */
type LogLevel = "DEBUG" | "INFO" | "WARN" | "ERROR";

/**
 * タイムスタンプを生成する関数
 */
function getTimestamp(): string {
  const date = new Date();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  const milliseconds = date.getMilliseconds().toString().padStart(3, "0");
  return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

/**
 * ログレベルごとのカラー設定
 */
const colors: Record<LogLevel, string> = {
  DEBUG: "#9E9E9E", // グレー
  INFO: "#4CAF50",  // 緑
  WARN: "#FFC107",  // 黄
  ERROR: "#F20404", // 赤
};

/**
 * ログレベルの優先順位
 */
const logLevelPriority: Record<LogLevel, number> = {
  DEBUG: 1,
  INFO: 2,
  WARN: 3,
  ERROR: 4,
};

/**
 * ログ関数のタイプ定義
 */
type LogFunction = (message: string, src?: any, level?: LogLevel) => void;

/**
 * useLogger フック
 * 
 * @param prefix - ログメッセージのプレフィックス
 * @returns log 関数
 * 
 * 使用例:
 * const { log } = useLogger("MyComponent");
 * log("This is an info message", { data: someData }, "INFO");
 */
export function useLogger(prefix: string): { log: LogFunction } {
  const log = useCallback<LogFunction>(
    (message, src, level: LogLevel = "INFO") => {
      // 本番環境でかつログレベルがWARN以下の場合はログを出力しない
      if (process.env.NODE_ENV === "production" && logLevelPriority[level] < logLevelPriority.WARN) {
        return;
      }

      const timestamp = getTimestamp();

      // ログレベルに応じたスタイルを設定
      const levelStyle = `color: ${colors[level]}; font-weight: bold;`;

      // プレフィックススタイル
      const prefixStyle = "color: #000000;";

      // タイムスタンプスタイル
      const timestampStyle = "color: gray; font-weight: lighter;";

      // ログメッセージのフォーマット
      const formattedPrefix = `%c[${prefix}]`;
      const formattedMessage = `%c${level}: ${message} @ %c${timestamp}`;
      const styles = [
        prefixStyle,
        levelStyle,
        timestampStyle,
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
