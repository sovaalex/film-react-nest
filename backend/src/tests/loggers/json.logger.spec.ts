import { JsonLogger } from '../../logger/json.logger';

describe('JsonLogger', () => {
  let logger: JsonLogger;
  let consoleLogSpy: jest.SpyInstance;
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    logger = new JsonLogger();
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('formatMessage', () => {
    it('должен возвращать JSON с level, message и optionalParams', () => {
      const result = logger.formatMessage('log', 'test msg', 'param1', 123);
      const parsed = JSON.parse(result);
      expect(parsed).toEqual({
        level: 'log',
        message: 'test msg',
        optionalParams: ['param1', 123],
      });
    });
  });

  describe('log методы', () => {
    it('log должен вызывать console.log с JSON level=log', () => {
      logger.log('test log', 'ctx1', true);
      expect(consoleLogSpy).toHaveBeenCalledWith(
        expect.stringContaining('"level":"log"'),
      );
      expect(consoleLogSpy).toHaveBeenCalledWith(
        expect.stringContaining('"message":"test log"'),
      );
      expect(consoleErrorSpy).not.toHaveBeenCalled();
    });

    it('error должен вызывать console.error с JSON level=error', () => {
      logger.error('test error', { error: true });
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining('"level":"error"'),
      );
      expect(consoleLogSpy).not.toHaveBeenCalled();
    });

    it('warn должен вызывать console.log с JSON level=warn', () => {
      logger.warn('test warn');
      expect(consoleLogSpy).toHaveBeenCalledWith(
        expect.stringContaining('"level":"warn"'),
      );
    });

    it('debug должен вызывать console.log с JSON level=debug', () => {
      logger.debug!('test debug', 42);
      expect(consoleLogSpy).toHaveBeenCalledWith(
        expect.stringContaining('"level":"debug"'),
      );
    });

    it('verbose должен вызывать console.log с JSON level=verbose', () => {
      logger.verbose!('test verbose');
      expect(consoleLogSpy).toHaveBeenCalledWith(
        expect.stringContaining('"level":"verbose"'),
      );
    });
  });

  describe('Различия console методов', () => {
    it('error использует console.error, остальные — console.log', () => {
      logger.error('error test');
      expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
      expect(consoleLogSpy).not.toHaveBeenCalled();
    });
  });
});
