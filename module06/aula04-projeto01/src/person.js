const { evaluateRegex } = require('../src/util');

class Person {
  constructor([
    name,
    nacionalidade,
    EstadoCivil,
    documento,
    rua,
    numero,
    bairro,
    estado,
  ]) {
    const firstLetterExp = evaluateRegex(/(^\w{1})([a-z|A-Z]+$)/);

    const formatFirstLetter = (prop) => {
      return prop.replace(firstLetterExp, (fullMatch, group1, group2) => {
        return `${group1.toUpperCase()}${group2.toLowerCase()}`;
      });
    };

    this.name = name;
    this.nacionalidade = formatFirstLetter(nacionalidade);
    this.EstadoCivil = formatFirstLetter(EstadoCivil);
    this.documento = documento.replace(evaluateRegex(/\D/gm), '');
    this.rua = rua.match(evaluateRegex(/(?<=\sa\s).*$/), '').join();
    this.numero = numero;
    this.bairro = bairro.match(evaluateRegex(/(?<=\s).*$/)).join();
    this.estado = estado.replace(evaluateRegex(/\.$/), '');
  }
}

module.exports = Person;
