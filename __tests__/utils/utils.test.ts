import { isEmpty, secondsToMinutesString } from '../../src/utils/utils';
describe('utils', () => {
  describe('isEmpty', () => {
    it('should return true when is an empty object', () => {
      const obj = {};
      expect(isEmpty(obj)).toBeTruthy();
    });

    it('should return false when is not an empty object', () => {
      const obj = { a: 'a' };
      expect(isEmpty(obj)).toBeFalsy();
    });
  });

  describe('secondsToMinutesString', () => {
    it('should return expected values', () => {
      expect(secondsToMinutesString(1)).toEqual('0:01');
      expect(secondsToMinutesString(10)).toEqual('0:10');
      expect(secondsToMinutesString(0)).toEqual('0:00');
      expect(secondsToMinutesString(-1)).toEqual('0:00');
      expect(secondsToMinutesString(60)).toEqual('1:00');
      expect(secondsToMinutesString(61)).toEqual('1:01');
      expect(secondsToMinutesString(350)).toEqual('5:50');
    });
  });
});
