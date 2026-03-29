import { LoggerService, Injectable } from '@nestjs/common';

@Injectable()
export class TskvLogger implements LoggerService {
  private escapeValue(value: any): string {
    const str = String(value);
    return str
      .replace(/\t/g, '\\t')
      .replace(/\n/g, '\\n')
      .replace(/\r/g, '\\r');
  }

  private formatMessage(level: string, message: any, ...optionalParams: any[]) {
    const time = new Date().toISOString();
    const escapedMessage = this.escapeValue(message);

    const fields = [`time=${time}`, `level=${level}`, `msg=${escapedMessage}`];

    optionalParams.forEach((param, index) => {
      const escapedParam = this.escapeValue(param);
      fields.push(`param${index}=${escapedParam}`);
    });

    return fields.join('\t');
  }

  log(message: any, ...optionalParams: any[]) {
    console.log(this.formatMessage('log', message, ...optionalParams));
  }

  error(message: any, ...optionalParams: any[]) {
    console.log(this.formatMessage('error', message, ...optionalParams));
  }

  warn(message: any, ...optionalParams: any[]) {
    console.log(this.formatMessage('warn', message, ...optionalParams));
  }

  debug?(message: any, ...optionalParams: any[]) {
    console.log(this.formatMessage('debug', message, ...optionalParams));
  }

  verbose?(message: any, ...optionalParams: any[]) {
    console.log(this.formatMessage('verbose', message, ...optionalParams));
  }
}
