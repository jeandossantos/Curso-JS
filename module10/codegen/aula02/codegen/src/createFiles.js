import fs from 'fs';

import templates from './templates/index.js';
import { Util } from './util.js';

const defaultDependencies = ({ layer, componentName }) => {
  const dependencies = {
    repository: [],
    service: [`${componentName}/Repository`],
    factory: [`${componentName}/Repository`, `${componentName}/Service`],
  };

  return dependencies[layer].map(Util.lowercaseFirstLetter);
};

async function executeWrite(pendingFIlesToWrite) {
  const result = pendingFIlesToWrite.map(({ filename, txtFile }) =>
    fs.writeFile(filename, txtFile)
  );

  return Promise.all(result);
}

export async function createFiles({
  componentName,
  mainPath,
  defaultMainPath: defaultMainFolder,
  layers,
}) {
  const keys = Object.keys(templates);

  const pendingFIlesToWrite = [];

  for (let layer of layers) {
    const chooseKey = keys.find((key) => key.includes(layer));

    if (!chooseKey) {
      return { error: 'the choose layer does not have a template' };
    }

    const template = templates[chooseKey];
    // usr/documents/js-expert/codegen/src/factory
    const targetFolder = `${mainPath}/${defaultMainFolder}/${layer}`;

    const dependencies = defaultDependencies({ layer, componentName });

    const { filename: className, template: txtFile } = template(
      componentName,
      ...dependencies
    );

    // usr/documents/js-expert/codegen/src/factory/heroesFactory.js
    const filename = `${targetFolder}/${Util.lowercaseFirstLetter(
      className
    )}.js`;

    pendingFIlesToWrite.push({ filename, txtFile });
  }

  await executeWrite(pendingFIlesToWrite);

  return { success: true };
}
