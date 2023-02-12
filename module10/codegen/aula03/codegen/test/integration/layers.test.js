import {
  jest,
  test,
  expect,
  describe,
  beforeEach,
  beforeAll,
  afterAll,
} from '@jest/globals';
import fs from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';

import { createLayersIfNotExists } from '../../src/createLayers.js';

function getFolders(config) {
  return fs.readdirSync(join(config.mainPath, config.defaultMainFolder));
}

describe('#Integration Layers - Layers Structure', () => {
  const config = {
    defaultMainFolder: 'src',
    mainPath: '',
    layers: ['repository', 'service', 'factory'].sort(),
  };

  beforeAll(() => {
    config.mainPath = fs.mkdtempSync(join(tmpdir(), 'skeleton-'));
  });

  afterAll(() => {
    fs.rmSync(config.mainPath, {
      recursive: true,
      force: true,
    });
  });

  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  test('#createLayersIfNotExists should not create folders if it exists', async () => {
    const beforeRun = fs.readdirSync(config.mainPath);

    await createLayersIfNotExists(config);

    const afterRun = getFolders(config);

    expect(beforeRun).not.toStrictEqual(afterAll);
    expect(afterRun).toEqual(config.layers);
  });

  test('#createLayersIfNotExists should create folders if it does not exist', async () => {
    const beforeRun = getFolders(config);

    await createLayersIfNotExists(config);

    const afterRun = getFolders(config);

    expect(beforeRun).toEqual(afterRun);
  });
});
