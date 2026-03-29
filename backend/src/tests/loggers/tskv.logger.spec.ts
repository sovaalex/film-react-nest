import { TskvLogger } from '../../logger/tskv.logger';

describe('TskvLogger', () => {
  let logger: TskvLogger;
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    logger = new TskvLogger();
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('escapeValue', () => {
    it('должен экранировать табы, переносы строк и возвраты каретки', () => {
      const input = 'test\twith\nnew\rline';
      const expected = 'test\\twith\\nnew\\rline';
      expect(logger['escapeValue'](input)).toBe(expected);
    });

    it('должен работать с простыми строками без спецсимволов', () => {
      expect(logger['escapeValue']('simple')).toBe('simple');
    });

    it('должен конвертировать non-string в строку и экранировать', () => {
      expect(logger['escapeValue'](123)).toBe('123');
      expect(logger['escapeValue'](null)).toBe('null');
    });
  });

  describe('formatMessage', () => {
    it('должен форматировать базовое сообщение без optionalParams', () => {
      const result = logger['formatMessage']('log', 'test msg');
      expect(result).toMatch(
        /^time=\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z\tlevel=log\tmsg=test msg$/,
      );
    });

    it('должен экранировать message и param с спецсимволами', () => {
      const result = logger['formatMessage'](
        'error',
        'msg\nwith\t\tabs\r',
        'param\nwith\nlines',
      );
      expect(result).toContain('msg=msg\\nwith\\t\\ttabs\\r');
      expect(result).toContain('param0=param\\nwith\\nlines');
    });

    it('должен добавлять несколько paramN=escapedValue', () => {
      const result = logger['formatMessage']('warn', 'msg', 'p1', 123, {
        obj: true,
      });
      expect(result).toContain('param0=p1');
      expect(result).toContain('param1=123');
      expect(result).toContain('param2=[object Object]');
    });
  });

  describe('log методы', () => {
    it('log должен выводить TSKV с level=log', () => {
      logger.log('test log', 'context1', 'context2');
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('level=log'),
      );
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('msg=test log'),
      );
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('param0=context1'),
      );
    });

    it('error должен выводить TSKV с level=error', () => {
      logger.error('test error');
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('level=error'),
      );
    });

    it('warn должен выводить TSKV с level=warn', () => {
      logger.warn('test warn', true);
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('level=warn'),
      );
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('param0=true'),
      );
    });

    it('debug должен работать и выводить level=debug', () => {
      logger.debug!('test debug');
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('level=debug'),
      );
    });

    it('verbose должен работать и выводить level=verbose', () => {
      logger.verbose!('test verbose');
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('level=verbose'),
      );
    });
  });
});
