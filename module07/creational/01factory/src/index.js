import { UserFactory } from './factory/userFactory.js';

(async () => {
  const userFactory = await UserFactory.createInstance();

  const result = await userFactory.find('some@query');

  console.log(result);
})();
