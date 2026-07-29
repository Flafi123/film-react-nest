import { JsonLogger } from './json.logger';

describe('JsonLogger', () => {
  let log;
  let jsonLogger: JsonLogger;

  beforeEach(() => {
    jsonLogger = new JsonLogger();
    log = jest.spyOn(console, 'warn').mockImplementation(() => {});
  });
  
  afterEach(() => {
    log.mockRestore();
  });

  it('should log correct format', () => {
    jsonLogger.warn('hello', { a: 'b', c: 1 });
    
    expect(log).toBeCalledTimes(1);
    expect(log).toBeCalledWith(
      '{"level":"warn","message":"hello","optionalParams":[{"a":"b","c":1}]}',
    );
  });
});