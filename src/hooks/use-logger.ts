import { useCallback } from "react";

/**
 * ログレベルの定義
 */
export enum LogLevel {
  DEBUG = 1,
  INFO,
  WARN,
  ERROR,
}

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
  [LogLevel.DEBUG]: "#9E9E9E", // グレー
  [LogLevel.INFO]: "#4CAF50",  // 緑
  [LogLevel.WARN]: "#FFC107",  // 黄
  [LogLevel.ERROR]: "#F20404", // 赤
};

/**
 * 環境変数から最小ログレベルを取得
 * デフォルトは INFO
 */
const ENV_LOG_LEVEL = (process.env.REACT_APP_LOG_LEVEL || "INFO").toUpperCase() as keyof typeof LogLevel;
const MIN_LOG_LEVEL = LogLevel[ENV_LOG_LEVEL] || LogLevel.INFO;

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
 * log("This is an info message", { data: someData }, LogLevel.INFO);
 */
export function useLogger(prefix: string): { log: LogFunction } {
  const log = useCallback<LogFunction>(
    (message, src, level = LogLevel.INFO) => {
      // 本番環境でかつログレベルがWARN以下の場合はログを出力しない
      if (process.env.NODE_ENV === "production" && level < LogLevel.WARN) {
        return;
      }

      // 環境設定された最小ログレベルよりも低い場合はログを出力しない
      if (level < MIN_LOG_LEVEL) {
        return;
      }

      const timestamp = getTimestamp();

      // ログレベルに応じたスタイルを設定
      const levelStyles: Record<LogLevel, string> = {
        [LogLevel.DEBUG]: `color: ${colors[LogLevel.DEBUG]};`,
        [LogLevel.INFO]: `color: ${colors[LogLevel.INFO]};`,
        [LogLevel.WARN]: `color: ${colors[LogLevel.WARN]}; font-weight: bold;`,
        [LogLevel.ERROR]: `color: ${colors[LogLevel.ERROR]}; font-weight: bold;`,
      };

      // ログメッセージのフォーマット
      const formattedPrefix = `%c[${prefix}]`;
      const formattedMessage = `%c${LogLevel[level]}: ${message} @ %c${timestamp}`;
      const styles = [
        levelStyles[level],
        "color: inherit; font-weight: bold;",
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
