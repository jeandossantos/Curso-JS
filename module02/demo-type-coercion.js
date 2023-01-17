const item = {
  name: 'jean',
  age: 25,
  toString() {
    return `Name: ${this.name} Age:${this.age}`;
  },
  valueOf() {
    return { key: 'dude' };
  },
  [Symbol.toPrimitive](coercionType) {
    console.log('trying to convert to: ', coercionType);

    const types = {
      string: JSON.stringify(this),
      number: 007,
    };

    return types[coercionType] || types.string;
  },
};

//console.log('toString: ' + String(item));

//vai retornar NaN porque o toString retornou uma string
//console.log('valueOf: ' + Number(item));

//depois de adiciona o [Symbol.toPrimitive]
// console.log('String: ' + String(item));
// console.log('Number: ' + Number(item));
// console.log('Date: ' + new Date(item));

console.assert(item + 0 === '{"name":"jean","age":25}0');
