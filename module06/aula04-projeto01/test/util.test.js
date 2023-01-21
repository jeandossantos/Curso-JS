const { it, describe } = require('mocha');
const { expect } = require('chai');
const { evaluateRegex, InvalidRegexError } = require('../src/util');

describe('Util', () => {
  it('#evaluateRegex should throw an error using an unsafe regex', () => {
    const unsafeRegex = /^([a-z|A-Z|0-9]+\s?)+$/;
    /**
     * time \
     * node  --eval "/^([a-z|A-Z|0-9]+\s?)+$/.test('eaaae man como vai você e como vai voce?') && console.log('testando')"
     */

    expect(() => evaluateRegex(unsafeRegex)).to.throw(
      InvalidRegexError,
      `This ${unsafeRegex} is unsafe, dude!`
    );
  });

  it('#evaluateRegex should not throw an error using a safe regex', () => {
    const safeRegex = /^([a-z])$/;

    expect(() => evaluateRegex(safeRegex)).to.not.throw();
    expect(evaluateRegex(safeRegex)).to.be.ok;
  });
});
