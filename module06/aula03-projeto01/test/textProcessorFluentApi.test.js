const { it, describe } = require('mocha');
const { expect } = require('chai');

const mock = require('./mock/valid');
const TextProcessorFluentApi = require('../src/textProcessorFluentApi');

describe('TextProcessorFluentApi', () => {
  it('#build', async () => {
    const result = new TextProcessorFluentApi(mock).build();

    expect(result).to.be.deep.equal(mock);
  });

  it('#extractPeopleData', async () => {
    const result = new TextProcessorFluentApi(mock).extractPeopleData().build();

    const expected = [
      [
        'Xuxa da Silva, brasileira, casada,CPF: 235.743.420-12, residente e',
        'domiciliada a rua dos bobos, zero, bairro Alphalline, São Paulo.',
      ].join('\n'),
      [
        'Júlia Menezes, brasileira, solteira,CPF: 297.947.800-81, residente e',
        'domiciliada a Av. dos Estados, 99, bairro Jardim, São Paulo.',
      ].join('\n'),
    ];

    expect(result).to.be.deep.equal(expected);
  });

  it('#divideTexInColumns', async () => {
    const content = [
      [
        'Xuxa da Silva, brasileira, casada,CPF: 235.743.420-12, residente e',
        'domiciliada a rua dos bobos, zero, bairro Alphalline, São Paulo.',
      ].join('\n'),
    ];

    const result = new TextProcessorFluentApi(content)
      .divideTexInColumns()
      .build();

    const expected = [
      [
        'Xuxa da Silva',
        ' brasileira',
        ' casada',
        'CPF: 235.743.420-12',
        ' residente e\ndomiciliada a rua dos bobos',
        ' zero',
        ' bairro Alphalline',
        ' São Paulo.',
      ],
    ];

    expect(result).to.be.deep.equal(expected);
  });

  it('#removeEmptyCharacters', async () => {
    const content = [
      [
        'Xuxa da Silva',
        ' brasileira',
        ' casada',
        'CPF: 235.743.420-12',
        ' residente e\ndomiciliada a rua dos bobos',
        ' zero',
        ' bairro Alphalline',
        ' São Paulo.',
      ],
    ];

    const expected = [
      [
        'Xuxa da Silva',
        'brasileira',
        'casada',
        'CPF: 235.743.420-12',
        'residente e\ndomiciliada a rua dos bobos',
        'zero',
        'bairro Alphalline',
        'São Paulo.',
      ],
    ];

    const result = new TextProcessorFluentApi(content)
      .removeEmptyCharacters()
      .build();

    expect(result).to.be.deep.equal(expected);
  });
});
