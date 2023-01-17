const assert = require('assert');

function* calculation(arg1, arg2) {
  yield arg1 * arg2;
}

function* main() {
  yield 'Hello';
  yield '-';
  yield 'World';
  yield* calculation(10, 20);
}

const generate = main();

console.log(generate.next());
console.log(generate.next());
console.log(generate.next());
console.log(generate.next());

// assert.deepStrictEqual(generate.next(), { value: 'Hello', done: false });
// assert.deepStrictEqual(generate.next(), { value: '-', done: false });
// assert.deepStrictEqual(generate.next(), { value: 'World', done: false });
// assert.deepStrictEqual(generate.next(), { value: 200, done: false });

assert.deepStrictEqual(Array.from(main()), ['Hello', '-', 'World', 200]);
assert.deepStrictEqual([...main()], ['Hello', '-', 'World', 200]);
