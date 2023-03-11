import { v4 as uuid } from 'uuid';
import Product from '../src/entities/product.js';

export default class Cart {
  constructor({ products }) {
    this.products = this.removeUndefined(products);
  }

  removeUndefined(products) {
    const result = [];

    for (let product of products) {
      const keys = Reflect.ownKeys(product);

      if (!keys.length) continue;

      //3°
      // let newObject = {};
      // keys.forEach((key) => {
      //   if (!product[key]) return;

      //   newObject[key] = product[key];
      // });

      result.push(new Product(newObject));
      //3°
      keys.forEach(
        (key) => product[key] || Reflect.deleteProperty(product, key)
      );

      //2°
      //keys.forEach((key) => product[key] || delete product[key]);

      // 1°
      result.push(new Product(product));
      //result.push(JSON.parse(JSON.stringify(new Product(product))));
    }

    return result;
  }
}
