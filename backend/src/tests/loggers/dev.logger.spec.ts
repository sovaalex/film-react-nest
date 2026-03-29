import { DevLogger } from '../../logger/dev.logger';
import { ConsoleLogger } from '@nestjs/common';

describe('DevLogger', () => {
  let logger: DevLogger;

  beforeEach(() => {
    logger = new DevLogger();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('log', () => {
    it('должен добавлять ISO timestamp к сообщению перед вызовом super.log', () => {
      const fakeTime = '2026-03-23T10:00:00.000Z';
      jest.spyOn(Date.prototype, 'toISOString').mockReturnValue(fakeTime);

      logger.log('test message', 'context1');

      expect(ConsoleLogger.prototype.log).toHaveBeenCalledWith(
        expect.stringContaining(`[${fakeTime}] test message`),
        'context1',
      );
    });

    it('должен передавать все optionalParams в super.log', () => {
      logger.log('msg', 'ctx1', 'ctx2', 123);
      expect(ConsoleLogger.prototype.log).toHaveBeenCalledWith(
        expect.any(String),
        'ctx1',
        'ctx2',
        123,
      );
    });
  });

  describe('userAction', () => {
    it('должен форматировать сообщение [userId] action и логировать с context', () => {
      logger.userAction('api', 'user123', 'login', 'extra');

      expect(ConsoleLogger.prototype.log).toHaveBeenCalledWith(
        '[user123] login',
        'api',
        'extra',
      );
    });

    it('должен обрабатывать optionalParams', () => {
      logger.userAction('service', 'u456', 'update', { data: true }, 200);
      expect(ConsoleLogger.prototype.log).toHaveBeenCalledWith(
        '[u456] update',
        'service',
        { data: true },
        200,
      );
    });
  });

  describe('apiCall', () => {
    it('должен форматировать API сообщение с duration и логировать с context', () => {
      logger.apiCall('auth', 'user789', '/login', 150);

      expect(ConsoleLogger.prototype.log).toHaveBeenCalledWith(
        '[user789 API /login (150ms)]',
        'auth',
      );
    });

    it('должен работать с разными duration значениями', () => {
      logger.apiCall('db', 'u999', '/query', 2500);
      expect(ConsoleLogger.prototype.log).toHaveBeenCalledWith(
        '[u999 API /query (2500ms)]',
        'db',
      );
    });
  });

  describe('Наследование от ConsoleLogger', () => {
    it('должен сохранять поведение ConsoleLogger для других методов', () => {
      const errorSpy = jest.spyOn(ConsoleLogger.prototype, 'error');
      const warnSpy = jest.spyOn(ConsoleLogger.prototype, 'warn');

      logger.error('test error');
      logger.warn('test warn');

      expect(errorSpy).toHaveBeenCalledWith('test error');
      expect(warnSpy).toHaveBeenCalledWith('test warn');
    });
  });
});
