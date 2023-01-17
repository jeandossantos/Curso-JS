const assert = require('assert');
const myMap = new Map();

myMap
  .set(1, 'one')
  .set('Erick', { text: 'two' })
  .set(true, () => 'Hello');

const myMapWithConstructor = new Map([
  ['1', 'str1'],
  [1, 'num1'],
  [true, 'boolean1'],
]);

//console.log(myMap);
//console.log('myMap.get(1)', myMap.get(1));

assert.deepStrictEqual(myMap.get('Erick'), { text: 'two' });
assert.deepStrictEqual(myMap.get(true)(), 'Hello');

//EM Objects a chave só pode ser string ou Symbol (number é corrigido para string)
const onlyReferenceWorks = { id: 1 };
myMap.set(onlyReferenceWorks, { name: 'ErickWend' });

assert.deepStrictEqual(myMap.get({ id: 1 }), undefined);
assert.deepStrictEqual(myMap.get(onlyReferenceWorks), { name: 'ErickWend' });

//Utilitários
assert.deepStrictEqual(myMap.size, 4);
assert.ok(myMap.has(onlyReferenceWorks));
assert.ok(myMap.delete(onlyReferenceWorks));

// for (const [key, value] of myMap) {
//   console.log({ key, value });
// }
