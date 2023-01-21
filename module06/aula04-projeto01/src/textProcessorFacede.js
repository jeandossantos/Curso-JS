const TextProcessorFluentApi = require('./textProcessorFluentApi');

class TextProcessorFacade {
  #textProcessorFluentApi;

  constructor(text) {
    this.#textProcessorFluentApi = new TextProcessorFluentApi(text);
  }

  getPeopleFromPDF() {
    return this.#textProcessorFluentApi
      .extractPeopleData()
      .divideTexInColumns()
      .removeEmptyCharacters()
      .mapPerson()
      .build();
  }
}

module.exports = TextProcessorFacade;
