import BaseBusiness from './base/baseBusiness.mjs';

export default class OrderBusiness extends BaseBusiness {
  #orders = new Set();

  _validateRequiredFields(data) {
    return data.amount !== undefined && data.products.length > 0;
  }

  _create(data) {
    this.#orders.add(data);

    return true;
  }
}
