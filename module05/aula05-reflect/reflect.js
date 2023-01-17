'use strict';

const assert = require('assert');

const myObject = {
  add(myValue) {
    return this.arg1 + this.arg2 + myValue;
  },
};

assert.deepStrictEqual(myObject.add.apply({ arg1: 10, arg2: 20 }, [100]), 130);

myObject.add.apply = function () {
  throw new TypeError('Vixxx');
};

assert.throws(() => myObject.add.apply({}, []), {
  name: 'TypeError',
  message: 'Vixxx',
});
// reflect

const result = Reflect.apply(myObject.add, { arg1: 40, arg2: 20 }, [200]);
assert.deepStrictEqual(result, 260);

function MyDate() {}

Object.defineProperty(MyDate, 'withObject', { value: () => 'Hey there!' });

Reflect.defineProperty(MyDate, 'withReflect', { value: () => 'Hey there!' });

assert.deepStrictEqual(MyDate.withObject(), 'Hey there!');
assert.deepStrictEqual(MyDate.withReflect(), 'Hey there!');

//delete property
const withDelete = { user: 'ErickWend' };
//evitar fazer
delete withDelete.user;

assert.deepStrictEqual(withDelete.hasOwnProperty('user'), false);

//com reflect
const withReflection = { user: 'XuxaDaSiva' };

Reflect.deleteProperty(withReflection, 'user');

assert.deepStrictEqual(withReflection.hasOwnProperty('user'), false);

// get property/method
// ===> deveríamos fazer um ge só em instancias de referencia
assert.deepStrictEqual((1)['username'], undefined);
// com reflect uma exceção é lançada!
assert.throws(() => Reflect.get(1, 'username'), TypeError);

// has property/method
// com in key
assert.ok('superman' in { superman: '' });
// com reflect
assert.ok(Reflect.has({ superman: 'superman' }, 'superman'));

// ownKeys property/method
const user = Symbol('user');

const databaseUser = {
  id: 1,
  [Symbol.for('password')]: 123,
  [user]: 'ErickWend',
};

//para saber mostrar as propriedades e symbols com métodos de Object
// devemos fazer 2 requisições
const objectKeys = [
  ...Object.getOwnPropertyNames(databaseUser),
  ...Object.getOwnPropertySymbols(databaseUser),
];

assert.deepStrictEqual(objectKeys, ['id', Symbol.for('password'), user]);
// com reflect é só uma requisição/método
assert.deepStrictEqual(Reflect.ownKeys(databaseUser), [
  'id',
  Symbol.for('password'),
  user,
]);
