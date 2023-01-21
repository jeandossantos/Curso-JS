const { it, describe } = require('mocha');
const { expect } = require('chai');

const Person = require('../src/person');

describe('Person', () => {
  it('should generate a person instance from properties list', () => {
    const content = [
      'Xuxa da Silva',
      'brasileira',
      'casada',
      'CPF: 235.743.420-12',
      'residente e\ndomiciliada a rua dos bobos',
      'zero',
      'bairro Alphalline',
      'São Paulo.',
    ];

    const result = new Person(content);

    const expected = {
      name: 'Xuxa da Silva',
      nacionalidade: 'Brasileira',
      EstadoCivil: 'Casada',
      documento: '23574342012',
      rua: 'rua dos bobos',
      numero: 'zero',
      bairro: 'Alphalline',
      estado: 'São Paulo',
    };

    expect(result).to.be.deep.equal(expected);
  });
});
