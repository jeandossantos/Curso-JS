import { expect, describe, test, jest, beforeAll } from '@jest/globals';
import BaseBusiness from '../src/business/base/baseBusiness.mjs';
import OrderBusiness from '../src/business/orderBusiness.mjs';
import { Order } from '../src/entities/order.mjs';
import { NotImplementedException } from '../src/utils/exception.mjs';

describe('Test Suite for template method design pattern', () => {
  beforeAll(() => jest.resetAllMocks());

  describe('#OrderBusiness', () => {
    test('execution Order Business without template method', () => {
      const order = new Order({
        customerId: Date.now(),
        amount: 1000.0,
        products: [
          {
            description: 'ferrari',
          },
        ],
      });

      const orderBusiness = new OrderBusiness();

      const isValid = orderBusiness._validateRequiredFields(order);

      const result = orderBusiness._create(order);

      expect(isValid).toBeTruthy();
      expect(result).toBeTruthy();
    });

    test('execution Order Business with template method', () => {
      const order = new Order({
        customerId: Date.now(),
        amount: 1000.0,
        products: [
          {
            description: 'ferrari',
          },
        ],
      });

      const orderBusiness = new OrderBusiness();

      const calledCreateFn = jest.spyOn(
        orderBusiness,
        orderBusiness._create.name
      );

      const calledValidationFn = jest.spyOn(
        orderBusiness,
        orderBusiness._validateRequiredFields.name
      );

      const result = orderBusiness.create(order);

      expect(result).toBeTruthy();
      expect(calledCreateFn).toHaveBeenCalled();
      expect(calledValidationFn).toHaveBeenCalled();
    });
  });
});
