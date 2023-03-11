import { v4 as uuid } from 'uuid';
import Product from '../src/entities/product.js';

export default class Cart {
  constructor({ products }) {
    this.products = this.removeUndefined(products);
  }

  removeUndefined(products) {
    const productsEntities = products
      .filter((product) => !!Reflect.ownKeys(product).length)
      .map((product) => new Product(product));

    return JSON.parse(JSON.stringify(productsEntities));
  }
}
