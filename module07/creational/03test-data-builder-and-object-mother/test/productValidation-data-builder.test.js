const { it, describe } = require('mocha');
const { expect } = require('chai');
const productValidator = require('../src');
const ProductDataBuilder = require('./model/productDataBuilder');

describe('Test data builder', () => {
  it("shouldn't return error with valid product", async () => {
    const product = ProductDataBuilder.aProduct().build();
    const result = productValidator(product);

    const expected = {
      errors: [],
      result: true,
    };

    expect(result).to.be.deep.equal(expected);
  });

  describe('Product validation rules', () => {
    it('should return an error with creating a product with invalid id', async () => {
      const product = ProductDataBuilder.aProduct().withInvalidId().build();
      const result = productValidator(product);

      const expected = {
        errors: ['id: invalid id, current 1, expected to be between 2 and 20'],
        result: false,
      };

      expect(result).to.be.deep.equal(expected);
    });

    it('should return an error with creating a product with invalid name', async () => {
      const product = ProductDataBuilder.aProduct().withInvalidName().build();
      const result = productValidator(product);

      const expected = {
        errors: [
          'name: invalid name, current abc123, expected to have only words',
        ],
        result: false,
      };

      expect(result).to.be.deep.equal(expected);
    });

    it('should return an error with creating a product with invalid price', async () => {
      const product = ProductDataBuilder.aProduct().withInvalidPrice().build();
      const result = productValidator(product);

      const expected = {
        errors: [
          'price: invalid price, current 2000, expected to be between 0 and 1000',
        ],
        result: false,
      };

      expect(result).to.be.deep.equal(expected);
    });

    it('should return an error with creating a product with invalid category', async () => {
      const product = ProductDataBuilder.aProduct()
        .withInvalidCategory()
        .build();
      const result = productValidator(product);

      const expected = {
        errors: [
          'category: invalid category, current mechanic, expected to be either electronic or organic',
        ],
        result: false,
      };

      expect(result).to.be.deep.equal(expected);
    });
  });
});
