import { LoggerService, Injectable } from '@nestjs/common';

@Injectable()
export class TskvLogger implements LoggerService {
  private formatMessage(
    level: string,
    message: unknown,
    ...optionalParams: unknown[]
  ): string {
    // Безопасное приведение message к строке
    let msgString = '';
    if (message instanceof Error) {
      msgString = message.message;
    } else if (typeof message === 'object' && message !== null) {
      msgString = JSON.stringify(message);
    } else {
      msgString = String(message ?? '');
    }

    // Очистка от табуляций и переносов строк для формата TSKV
    const cleanMessage = msgString.replace(/[\t\n\r]/g, ' ');

    const optional =
      optionalParams.length > 0
        ? `optional=${JSON.stringify(optionalParams)}`
        : '';

    return [`level=${level}`, `message=${cleanMessage}`, optional]
      .filter(Boolean)
      .join('\t');
  }

  /**
   * Write a 'log' level log.
   */
  log(message: unknown, ...optionalParams: unknown[]) {
    console.log(this.formatMessage('log', message, ...optionalParams));
  }

  /**
   * Write an 'error' level log.
   */
  error(message: unknown, ...optionalParams: unknown[]) {
    console.error(this.formatMessage('error', message, ...optionalParams));
  }

  /**
   * Write a 'warn' level log.
   */
  warn(message: unknown, ...optionalParams: unknown[]) {
    console.warn(this.formatMessage('warn', message, ...optionalParams));
  }

  /**
   * Write a 'debug' level log.
   */
  debug(message: unknown, ...optionalParams: unknown[]) {
    console.debug(this.formatMessage('debug', message, ...optionalParams));
  }

  /**
   * Write a 'verbose' level log.
   */
  verbose(message: unknown, ...optionalParams: unknown[]) {
    console.log(this.formatMessage('verbose', message, ...optionalParams));
  }

  /**
   * Write a 'fatal' level log.
   */
  fatal(message: unknown, ...optionalParams: unknown[]) {
    console.error(this.formatMessage('fatal', message, ...optionalParams));
  }
}
