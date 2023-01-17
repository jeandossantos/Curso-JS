const { describe, it, before, beforeEach, afterEach } = require('mocha');
const sinon = require('sinon');
const { expect } = require('chai');

const { join } = require('node:path');

const CarService = require('../../service/carService');

const mocks = {
  validCarCategory: require('../../mocks/valid-carCategory.json'),
  validCar: require('../../mocks/valid-car.json'),
  validCustomer: require('../../mocks/valid-customer.json'),
};

const carsDatabase = join(__dirname, './../../database', 'cars.json');

describe('CarService suite tests', () => {
  let carService = {};
  let sandBox = {};

  before(() => {
    carService = new CarService({ cars: carsDatabase });
  });

  beforeEach(() => {
    sandBox = sinon.createSandbox();
  });

  afterEach(() => {
    sandBox.restore();
  });

  it('should retrieve a random position from an array', () => {
    const data = [0, 1, 2, 3, 4];

    const result = carService.getRandomPositionFromArray(data);

    expect(result).to.be.lte(data.length).and.be.gte(0);
  });

  it('should choose the first id from carIds in carCategory', () => {
    const carCategory = mocks.validCarCategory;
    const carIdIndex = 0;

    sandBox
      .stub(carService, carService.getRandomPositionFromArray.name)
      .returns(carIdIndex);

    const result = carService.chooseRandomCar(carCategory);
    const expected = carCategory.carIds[carIdIndex];

    expect(carService.getRandomPositionFromArray.calledOnce).to.be.ok;
    expect(result).to.be.equal(expected);
  });

  it('Given a carCategory it should return an available car', async () => {
    const car = mocks.validCar;

    const carCategory = Object.create(mocks.validCarCategory);
    carCategory.carIds = [car.id];

    sandBox
      .stub(carService.carRepository, carService.carRepository.find.name)
      .resolves(car);

    sandBox.spy(carService, carService.chooseRandomCar.name);

    const expected = car;

    const result = await carService.getAvailableCar(carCategory);

    expect(carService.chooseRandomCar.calledOnce).to.be.ok;
    expect(carService.carRepository.find.calledWithExactly(car.id)).to.be.ok;

    expect(result).to.be.deep.equal(expected);
  });
});
