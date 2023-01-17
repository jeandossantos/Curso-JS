const assert = require('assert');

const arr1 = ['0', '1', '2'];
const arr2 = ['2', '0', '3'];

const arr3 = arr1.concat(arr2);

assert.deepStrictEqual(arr3.sort(), ['0', '0', '1', '2', '2', '3']);

const set = new Set();
arr1.forEach((x) => set.add(x));
arr2.forEach((x) => set.add(x));

assert.deepStrictEqual(Array.from(set), ['0', '1', '2', '3']);

assert.deepStrictEqual(Array.from(new Set([...arr1, ...arr2])), [
  '0',
  '1',
  '2',
  '3',
]);

//Utilitários
//console.log('set.keys', set.keys());
//console.log('set.values', set.values()); // só existe por conta do map

assert.ok(set.has('3'));

const users01 = new Set(['Erick', 'maria', 'jean']);
const users02 = new Set(['John', 'ricardo', 'Erick']);

const intersection = new Set(
  Array.from([...users01].filter((u) => users02.has(u)))
);
//console.log(intersection);
assert.deepEqual(Array.from(intersection), ['Erick']);
