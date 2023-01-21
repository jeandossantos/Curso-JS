'use strict';

const { readFileSync } = require('fs');
const { join } = require('path');
const pdf = require('pdf-parse');
const TextProcessorFacade = require('./textProcessorFacede');

(async () => {
  const dataBuffer = readFileSync(join(__dirname, '../../docs/contrato.pdf'));
  const data = await pdf(dataBuffer);

  const instance = new TextProcessorFacade(data.text);

  const people = instance.getPeopleFromPDF();

  console.log(people);
})();
