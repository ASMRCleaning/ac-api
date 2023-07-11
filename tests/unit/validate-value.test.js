const {
  validateString,
  validateBoolean,
  validateNumber,
  validateObject,
} = require('../../src/model/validate-value');
const logger = require('../../src/logger');

jest.mock('../../src/logger');

describe('validate-value.js', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('validateString', () => {
    test('should return the value if it is a string', () => {
      const value = 'Hello World';
      const key = 'exampleKey';

      const result = validateString(value, key);

      expect(result).toBe(value);
      expect(logger.warn).not.toHaveBeenCalled();
    });

    test('should throw an error if the value is not a string', () => {
      const value = 123;
      const key = 'exampleKey';
      const expectedErrorMessage = `value of ${key} not accepted`;

      expect(() => {
        validateString(value, key);
      }).toThrow(Error(expectedErrorMessage));

      expect(logger.warn).toHaveBeenCalledWith(`value of ${key} not accepted`);
    });
  });

  describe('validateBoolean', () => {
    test('should return the value if it is a boolean', () => {
      const value = true;
      const key = 'exampleKey';

      const result = validateBoolean(value, key);

      expect(result).toBe(value);
      expect(logger.warn).not.toHaveBeenCalled();
    });

    test('should throw an error if the value is not a boolean', () => {
      const value = 'false';
      const key = 'exampleKey';
      const expectedErrorMessage = `value of ${key} not accepted`;

      expect(() => {
        validateBoolean(value, key);
      }).toThrow(Error(expectedErrorMessage));

      expect(logger.warn).toHaveBeenCalledWith(`value of ${key} not accepted`);
    });
  });

  describe('validateNumber', () => {
    test('should return the value if it is a number', () => {
      const value = 42;
      const key = 'exampleKey';

      const result = validateNumber(value, key);

      expect(result).toBe(value);
      expect(logger.warn).not.toHaveBeenCalled();
    });

    test('should throw an error if the value is not a number', () => {
      const value = '123';
      const key = 'exampleKey';
      const expectedErrorMessage = `value of ${key} not accepted`;

      expect(() => {
        validateNumber(value, key);
      }).toThrow(Error(expectedErrorMessage));

      expect(logger.warn).toHaveBeenCalledWith(`value of ${key} not accepted`);
    });
  });

  describe('validateObject', () => {
    test('should return the value if it is an object', () => {
      const value = { key: 'value' };
      const key = 'exampleKey';

      const result = validateObject(value, key);

      expect(result).toBe(value);
      expect(logger.warn).not.toHaveBeenCalled();
    });

    test('should throw an error if the value is not an object', () => {
      const value = 'not an object';
      const key = 'exampleKey';
      const expectedErrorMessage = `value of ${key} not accepted`;

      expect(() => {
        validateObject(value, key);
      }).toThrow(Error(expectedErrorMessage));

      expect(logger.warn).toHaveBeenCalledWith(`value of ${key} not accepted`);
    });
  });
});
