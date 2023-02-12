import { Util } from '../util.js';

const componentNameAnchor = '$$componentName';
const template = `export class $$componentNameRepository {
  constructor() {}

  create(data) {
    return Promise.reject('method not implemented!');
  }

  read(query) {
    return Promise.reject('method not implemented!');
  }

  update(id, data) {
    return Promise.reject('method not implemented!');
  }

  delete(id) {
    return Promise.reject('method not implemented!');
  }
}`;

export default function repositoryTemplate(componentName) {
  return {
    filename: `${componentName}Repository`,
    template: template.replaceAll(
      componentNameAnchor,
      Util.uppercaseFirstLetter(componentName)
    ),
  };
}
