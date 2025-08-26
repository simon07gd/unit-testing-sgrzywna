import { QuantityValidator } from 'tasks/task2';

describe('QuantityValidator', () => {
  describe('constructor validation', () => {
    it('throws if threshold is negative', () => {
      expect(() => new QuantityValidator(-1, 5)).toThrow('threshold cannot be negative');
    });

    it('throws if packagesize is less than zero', () => {
      expect(() => new QuantityValidator(5, -3)).toThrow('packagesize has to be greater than zero');
    });
    
    it('throws if packagesize is zero', () => {
      expect(() => new QuantityValidator(5, 0)).toThrow('packagesize has to be greater than zero');
    });
  });

  describe('validate method validation', () => {
    let validator: QuantityValidator;
    const testQuantity = 3;
    beforeEach(() => {
      validator = new QuantityValidator(6, testQuantity);
    });

    it('returns invalid and error if quantity is less than zero', () => {
      const result = validator.validate(-1);
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('quantity less than zero');
    });

    it('returns invalid and error if quantity is zero', () => {
      const result = validator.validate(0);
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('quantity is zero');
    });

    it('returns invalid and error if quantity is greater or equal threshold and not divisible by packageSize', () => {
      const result = validator.validate(10);
      expect(result.isValid).toBe(false);
      expect(result.error).toBe(`quantity exceeds threshold and not divisible by ${testQuantity}`)
    });
  });
});
