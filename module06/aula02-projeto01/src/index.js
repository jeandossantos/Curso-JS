'use strict';

const { readFileSync } = require('fs');
const { join } = require('path');
const pdf = require('pdf-parse');

(async () => {
  const dataBuffer = readFileSync(join(__dirname, '../../docs/contrato.pdf'));
  const data = await pdf(dataBuffer);

  console.log(data.text);
})();
