import { Util } from '../util.js';

const componentNameAnchor = '$$componentName';
const currentContextAnchor = '$$currentContext';
const repositoryAnchor = '$$repositoryName';

const template = `export class $$componentNameService {
  constructor({ repository: $$repositoryName }) {
    $$currentContext = $$repositoryName;
  }

  create(data) {
    return $$currentContext.create(data);
  }

  read(query) {
    return $$currentContext.read(query);
  }

  update(id, data) {
    return $$currentContext.update(id, data);
  }

  delete(id) {
    return $$currentContext.delete(id);
  }
}`;

export default function serviceTemplate(componentName, repositoryName) {
  const currentContext = `this.${repositoryName}`;
  const txtFile = template
    .replaceAll(componentNameAnchor, Util.uppercaseFirstLetter(componentName))
    .replaceAll(currentContextAnchor, currentContext)
    .replaceAll(repositoryAnchor, repositoryName);

  return {
    filename: `${componentName}Service`,
    template: txtFile,
  };
}
