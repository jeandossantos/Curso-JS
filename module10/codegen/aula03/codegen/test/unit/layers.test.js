import { jest, test, expect, describe, beforeEach } from '@jest/globals';
import fs from 'fs';

import { createLayersIfNotExists } from '../../src/createLayers';

describe('#Layers - Folder Structure', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  const defaultLayers = ['repository', 'service', 'factory'];

  test('#createLayersIfNotExists should create folders if it does not exist', async () => {
    jest.spyOn(fs, fs.mkdirSync.name).mockResolvedValue();
    jest.spyOn(fs, fs.existsSync.name).mockReturnValue(false);

    await createLayersIfNotExists({
      mainPath: '',
      layers: defaultLayers,
    });

    expect(fs.existsSync).toHaveBeenCalledTimes(defaultLayers.length);
    expect(fs.mkdirSync).toHaveBeenCalledTimes(defaultLayers.length);
  });

  test('#createLayersIfNotExists should not create folders if it exists', async () => {
    jest.spyOn(fs, fs.mkdirSync.name).mockResolvedValue();
    jest.spyOn(fs, fs.existsSync.name).mockReturnValue(true);

    await createLayersIfNotExists({
      mainPath: '',
      layers: defaultLayers,
    });

    expect(fs.existsSync).toHaveBeenCalledTimes(defaultLayers.length);
    expect(fs.mkdirSync).not.toHaveBeenCalled();
  });
});
