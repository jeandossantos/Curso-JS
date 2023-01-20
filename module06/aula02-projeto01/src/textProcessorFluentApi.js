/**
 * o objetivo do fluent api é executar tarefas como um pipeline
 * step by step, e no final, chamar o build. Muito similar ao padrão Builder
 * a diferença aqui é sobre processos, o Builder sobre construção de objetos *
 */
class TextProcessorFluentApi {
  #content;

  constructor(content) {
    this.#content = content;
  }

  extractPeopleData() {
    const matchPerson =
      /(?<=[contratante|contratada]:\s{1})(?!\s)(.*\n.*?)$/gim;
    const onlyPerson = this.#content.match(matchPerson);

    this.#content = onlyPerson;

    return this;
  }

  build() {
    return this.#content;
  }
}

module.exports = TextProcessorFluentApi;
