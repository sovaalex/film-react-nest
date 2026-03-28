import { Injectable, Scope, ConsoleLogger } from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export class DevLogger extends ConsoleLogger {
  log(message: any, ...optionalParams: any[]) {
    const timestamp = new Date().toISOString();
    super.log(`[${timestamp}] ${message}`, ...optionalParams);
  }

  userAction(
    context: string,
    userId: string,
    action: string,
    ...optionalParams: any[]
  ) {
    const message = `[${userId}] ${action}`;
    super.log(message, context, ...optionalParams);
  }

  apiCall(context: string, userId: string, endpoint: string, duration: number) {
    const message = `[${userId} API ${endpoint} (${duration}ms)]`;
    super.log(message, context);
  }
}
