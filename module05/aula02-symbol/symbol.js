const assert = require('assert');

const uniqueKey = Symbol('username');

const user = {};

user['username'] = 'value for normal objects';
user[uniqueKey] = 'value for Symbol';

console.log('getting normal object', user.username);
console.log('getting normal object', user[uniqueKey]);

console.log('Symbols', Object.getOwnPropertySymbols(user)[0]);

const obj = {
  [Symbol.iterator]: () => {
    return {
      items: ['a', 'b', 'c'],
      next() {
        return {
          done: this.items.length === 0,
          value: this.items.pop(),
        };
      },
    };
  },
};

for (let item of obj) {
  console.log('item', item);
}

const kItems = Symbol('kItems');

class MyDate {
  constructor(...args) {
    this[kItems] = args.map((arg) => new Date(...arg));
  }
}

const myDate = new MyDate([2020, 03, 01], [2018, 02, 02]);

console.log('myDate', myDate);
