const { join } = require('node:path');
const { writeFile } = require('node:fs/promises');
const faker = require('faker');
const { randomUUID } = require('node:crypto');
const Car = require('../entities/car');
const Customer = require('../entities/customer');
const CarCategory = require('../entities/carCategory');

const seedBaseFolder = join(__dirname, '..', 'database');
const ITEMS_AMOUNT = 2;

const carCategory = new CarCategory({
  id: faker.random.uuid(),
  name: faker.vehicle.type(),
  carIds: [],
  price: faker.finance.amount(20, 100),
});

const cars = [];
const customers = [];

for (let i = 0; i <= ITEMS_AMOUNT; i++) {
  const car = new Car({
    id: faker.random.uuid(),
    name: faker.vehicle.model(),
    available: true,
    gasAvailable: true,
    releaseYear: faker.date.past().getFullYear(),
  });

  carCategory.carIds.push(car.id);
  cars.push(car);

  const customer = new Customer({
    id: faker.random.uuid(),
    name: faker.name.findName(),
    age: faker.random.number({ min: 18, max: 50 }),
  });

  customers.push(customer);
}

const write = (filename, data) => {
  return writeFile(join(seedBaseFolder, filename), JSON.stringify(data));
};

(async () => {
  await write('cars.json', cars);
  await write('carCategories.json', [carCategory]);
  await write('customers.json', customers);

  console.log('customers.json', customers);
  console.log('cars.json', cars);
  console.log('carCategories.json', carCategory);
})();
