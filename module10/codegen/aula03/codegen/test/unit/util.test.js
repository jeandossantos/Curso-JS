import { jest, test, expect, describe, beforeEach } from '@jest/globals';
import { Util } from '../../src/util';

describe('#Util - Strings', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  test('#uppercaseFirstLetter should transform the first letter in uppercase', () => {
    const data = 'hello';
    const expected = 'Hello';

    const result = Util.uppercaseFirstLetter(data);

    expect(result).toStrictEqual(expected);
  });
  test('#lowercaseFirstLetter should transform the first letter in lowercase', () => {
    const data = 'Hello';
    const expected = 'hello';

    const result = Util.lowercaseFirstLetter(data);

    expect(result).toStrictEqual(expected);
  });

  test('#uppercaseFirstLetter given an empty string it should return an empty string', () => {
    const data = '';
    const expected = '';

    const result = Util.uppercaseFirstLetter(data);

    expect(result).toStrictEqual(expected);
  });

  test('#lowercaseFirstLetter given an empty string it should return an empty string', () => {
    const data = '';
    const expected = '';

    const result = Util.lowercaseFirstLetter(data);

    expect(result).toStrictEqual(expected);
  });
});
