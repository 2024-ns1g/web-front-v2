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
 * 現在の環境で許可される最低ログレベル
 */
const currentLogLevel: LogLevel = process.env.NODE_ENV === "production" ? "WARN" : "DEBUG";

/**
 * useLogger フック
 * 
 * @param prefix - ログメッセージのプレフィックス
 * @returns チェーン式ログオブジェクト
 */
export function useLogger(prefix: string) {
  const log = (level: LogLevel) => (message: string, src?: any) => {
    if (logLevelPriority[level] < logLevelPriority[currentLogLevel]) {
      return; // 許可されていないログレベルは無視
    }

    const formattedMessage = `[${prefix}] [${level}] ${message}`;

    switch (level) {
      case "DEBUG":
        console.debug(formattedMessage, src || "");
        break;
      case "INFO":
        console.info(formattedMessage, src || "");
        break;
      case "WARN":
        console.warn(formattedMessage, src || "");
        break;
      case "ERROR":
        console.error(formattedMessage, src || "");
        break;
    }
  };

  return {
    debug: log("DEBUG"),
    info: log("INFO"),
    warn: log("WARN"),
    error: log("ERROR"),
  };
}
