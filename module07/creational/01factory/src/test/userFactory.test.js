import rewiremock from 'rewiremock/node.js';
import { deepStrictEqual } from 'assert';

import { Database } from '../util/database.js';

const dbData = [[{ name: 'Mariazinha' }, { name: 'Joanzin' }]];

export class MockDatabase {
  connect = () => this;
  find = async (query) => dbData;
}

rewiremock(() => Database).with(MockDatabase);

(async () => {
  {
    const expected = [[{ name: 'MARIAZINHA' }, { name: 'JOANZIN' }]];

    rewiremock.enable();
    const UserFactory = require('../factory/userFactory.js');
    const userFactory = await UserFactory.createInstance();
    const result = await userFactory.find();
    deepStrictEqual(result, expected);
    rewiremock.disable();
  }
})();
