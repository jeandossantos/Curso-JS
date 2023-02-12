import { Util } from '../util.js';

const componentNameAnchor = '$$componentName';

const repositoryNameAnchor = '$$repositoryName';
const serviceNameAnchor = '$$serviceName';

const repositoryFilenameAnchor = '$$repositoryFilename';
const serviceFilenameAnchor = '$$serviceFilename';

const template = `import { $$repositoryName } from '../repository/$$repositoryFilename.js';
import { $$serviceName } from '../service/$$serviceFilename.js';

export class $$componentNameFactory {
  static getInstance() {
    const repository = new $$repositoryName();
    const service = new $$serviceName({ repository });

    return service;
  }
}`;

export default function factoryTemplate(
  componentName,
  repositoryName,
  serviceName
) {
  const txtFile = template
    .replaceAll(componentNameAnchor, Util.uppercaseFirstLetter(componentName))
    .replaceAll(repositoryNameAnchor, Util.uppercaseFirstLetter(repositoryName))
    .replaceAll(serviceNameAnchor, Util.uppercaseFirstLetter(serviceName))
    .replaceAll(
      repositoryFilenameAnchor,
      Util.lowercaseFirstLetter(repositoryName)
    )
    .replaceAll(serviceFilenameAnchor, Util.lowercaseFirstLetter(serviceName));

  return {
    filename: `${componentName}Factory`,
    template: txtFile,
  };
}
