#!/usr/bin/env node

//npm link para instalar esse projeto no pc
//npm unlink para desinstalar

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { createFiles } from './createFiles.js';
import { createLayersIfNotExists } from './createLayers.js';

const {
  argv: { componentName },
} = yargs(hideBin(process.argv)).command(
  'skeleton',
  'create project skeleton',
  (builder) => {
    return builder
      .option('component-name', {
        alias: 'c',
        demandOption: true,
        describe: "Component's name",
        type: 'array',
      })
      .example(
        'codegen skeleton component-name product',
        'create a project with a simple domain'
      )
      .example(
        'codegen skeleton -c person -c colors -c product',
        'create a project with multiple domains'
      )
      .epilog('Copyright (c) 2021 - Jean dos Santos');
  }
);

const env = process.env.NODE_ENV;
const defaultMainFolder = env === 'dev' ? 'tmp-src' : 'src';
const layers = ['repository', 'service', 'factory'].sort();

const config = {
  defaultMainFolder,
  layers,
  mainPath: '.',
};

await createLayersIfNotExists(config);

const pendingPromises = [];

for (let domain of componentName) {
  const result = createFiles({
    ...config,
    componentName: domain,
  });

  pendingPromises.push(result);
}

await Promise.all(pendingPromises);
