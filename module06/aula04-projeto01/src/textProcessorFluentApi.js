/**
 * o objetivo do fluent api é executar tarefas como um pipeline
 * step by step, e no final, chamar o build. Muito similar ao padrão Builder
 * a diferença aqui é sobre processos, o Builder sobre construção de objetos *
 */

const { evaluateRegex } = require('../src/util');
const Person = require('./person');

class TextProcessorFluentApi {
  #content;

  constructor(content) {
    this.#content = content;
  }

  divideTexInColumns() {
    const divideRegex = evaluateRegex(/,/);

    this.#content = this.#content.map((line) => line.split(divideRegex));

    return this;
  }

  removeEmptyCharacters() {
    const trimSpaces = evaluateRegex(/^\s+|\s$|\n/);

    this.#content = this.#content.map((line) =>
      line.map((line) => line.replace(trimSpaces, ''))
    );

    return this;
  }

  extractPeopleData() {
    const matchPerson = evaluateRegex(
      /(?<=[contratante|contratada]:\s{1})(?!\s)(.*\n.*?)$/gim
    );

    const onlyPerson = this.#content.match(matchPerson);

    this.#content = onlyPerson;

    return this;
  }

  mapPerson() {
    this.#content = this.#content.map((line) => new Person(line));

    return this;
  }

  build() {
    return this.#content;
  }
}

module.exports = TextProcessorFluentApi;
