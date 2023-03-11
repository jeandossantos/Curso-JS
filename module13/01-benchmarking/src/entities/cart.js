import { v4 as uuid } from 'uuid';
import Product from './product.js';

export default class Cart {
  constructor({ at, products }) {
    this.id = uuid();
    this.at = at;
    this.products = this.removeUndefined(products);
    this.total = this.getCartPrice();
  }

  removeUndefined(products) {
    const result = [];

    for (let product of products) {
      const keys = Reflect.ownKeys(product);

      if (!keys.length) continue;

      result.push(new Product(newObject));

      keys.forEach((key) => product[key] || delete product[key]);

      result.push(new Product(product));
    }
  }

  getCartPrice() {
    let total = 0;

    for (let product of this.products) {
      total += product.price;
    }

    return total;
  }
}
