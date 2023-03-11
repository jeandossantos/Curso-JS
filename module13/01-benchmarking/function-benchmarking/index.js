import benchmark from 'benchmark';
// import CartIdOld from './cart-id-old.js';
// import CartIdNew from './cart-id-new.js';

// import CartRmEmptyPropsReduce from './cart-rm-prop-old.js';
// import CartRmEmptyPropsForOf from './cart-rm-prop-new.js';

import CartGetTotalOld from './cart-get-total-old.js';
import CartGetTotalNew from './cart-get-total-new.js';
import database from '../database.js';

const suite = new benchmark.Suite();

// suite
//   .add('Cart-id-uuid-v4', function () {
//     new CartIdOld();
//   })
//   .add('Cart-id-crypto', function () {
//     new CartIdNew();
//   })
//   .on('cycle', (event) => console.log(String(event.target)))
//   .on('complete', function () {
//     console.log(`Fastest is ${this.filter('fastest').map('name')}`);
//   })
//   .run({ async: true });

// const products = [
//   {
//     id: 'ae',
//     n: undefined,
//     abc: undefined,
//     a: null,
//     b: 123,
//   },
//   {
//     id: 'ae',
//     n: undefined,
//     abc: undefined,
//     a: null,
//     b: 123,
//   },
// ];

// suite
//   .add('Cart#rmEmptyPropsReduce', function () {
//     new CartRmEmptyPropsReduce({ products });
//   })
//   .add('Cart#rmEmptyPropsForOf', function () {
//     new CartRmEmptyPropsForOf({ products });
//   })
//   .on('cycle', (event) => console.log(String(event.target)))
//   .on('complete', function () {
//     console.log(`Fastest is ${this.filter('fastest').map('name')}`);
//   })
//   .run({ async: true });

const products = database.products;

suite
  .add('Cart#GetTotalPriceReduce', function () {
    new CartGetTotalOld({ products });
  })
  .add('Cart#GetTotalPriceForOf', function () {
    new CartGetTotalNew({ products });
  })
  .on('cycle', (event) => console.log(String(event.target)))
  .on('complete', function () {
    console.log(`Fastest is ${this.filter('fastest').map('name')}`);
  })
  .run({ async: true });
