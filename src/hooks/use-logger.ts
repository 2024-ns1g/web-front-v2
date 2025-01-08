import { useCallback } from "react";

/**
 * ログレベルの定義
 */
type LogLevel = "DEBUG" | "INFO" | "WARN" | "ERROR";

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
type LogFunction = (message: string, src?: any) => void;

/**
 * useLogger フック
 * 
 * @param prefix - ログメッセージのプレフィックス
 * @returns log オブジェクト (log.debug, log.info, log.warn, log.error)
 * 
 * 使用例:
 * const log = useLogger("MyComponent");
 * log.info("This is an info message", { data: someData });
 * log.error("This is an error message", new Error("Something went wrong"));
 */
export function useLogger(prefix: string): {
  debug: LogFunction;
  info: LogFunction;
  warn: LogFunction;
  error: LogFunction;
} {
  const createLog = useCallback(
    (level: LogLevel, consoleFunc: (...args: any[]) => void): LogFunction => {
      return (message, src) => {
        // 本番環境でかつログレベルがWARN以下の場合はログを出力しない
        if (
          process.env.NODE_ENV === "production" &&
          logLevelPriority[level] < logLevelPriority.WARN
        ) {
          return;
        }

        const formattedMessage = `[${prefix}] [${level}] ${message}`;

        if (src !== undefined) {
          consoleFunc(formattedMessage, src);
        } else {
          consoleFunc(formattedMessage);
        }
      };
    },
    [prefix]
  );

  return {
    debug: createLog("DEBUG", console.debug),
    info: createLog("INFO", console.info),
    warn: createLog("WARN", console.warn),
    error: createLog("ERROR", console.error),
  };
}
