import { jest, test, expect, describe, beforeEach } from '@jest/globals';
import fs from 'fs';

import { createFiles } from '../../src/createFiles';
import templates from '../../src/templates';

describe('#Files - File Structure', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  const defaultLayers = ['repository', 'service', 'factory'];

  const config = {
    componentName: 'heroes',
    mainPath: './',
    defaultMainPath: 'src',
    layers: defaultLayers,
  };

  const repositoryLayer = `${config.componentName}Repository`;
  const serviceLayer = `${config.componentName}Service`;

  test('should not create file structure on inexistent templates', async () => {
    const myConfig = {
      ...config,
      layers: ['inexistent'],
    };

    const expected = { error: 'the choose layer does not have a template' };

    const result = await createFiles(myConfig);

    expect(result).toStrictEqual(expected);
  });

  test('repository should not create add additional dependencies', async () => {
    jest.spyOn(fs, fs.writeFileSync.name).mockResolvedValue();
    jest.spyOn(templates, templates.repositoryTemplate.name).mockReturnValue({
      filename: '',
      template: '',
    });

    const myConfig = {
      ...config,
      layers: ['repository'],
    };

    const expected = { success: true };

    const result = await createFiles(myConfig);

    expect(result).toStrictEqual(expected);
    expect(fs.writeFileSync).toHaveBeenCalledTimes(myConfig.layers.length);
  });

  test('service should have repository as dependencies', async () => {
    jest.spyOn(fs, fs.writeFileSync.name).mockResolvedValue();
    jest.spyOn(templates, templates.serviceTemplate.name).mockReturnValue({
      filename: '',
      template: '',
    });

    const myConfig = {
      ...config,
      layers: ['repository', 'service'],
    };

    const expected = { success: true };

    const result = await createFiles(myConfig);

    expect(result).toStrictEqual(expected);
    expect(fs.writeFileSync).toHaveBeenCalledTimes(myConfig.layers.length);
    expect(templates.serviceTemplate).toHaveBeenCalledWith(
      myConfig.componentName,
      repositoryLayer
    );
  });

  test('factory should have repository and service as dependencies', async () => {
    jest.spyOn(fs, fs.writeFileSync.name).mockResolvedValue();
    jest.spyOn(templates, templates.factoryTemplate.name).mockReturnValue({
      filename: '',
      template: '',
    });

    const myConfig = {
      ...config,
    };

    const expected = { success: true };

    const result = await createFiles(myConfig);

    expect(result).toStrictEqual(expected);
    expect(fs.writeFileSync).toHaveBeenCalledTimes(myConfig.layers.length);
    expect(templates.factoryTemplate).toHaveBeenCalledWith(
      myConfig.componentName,
      repositoryLayer,
      serviceLayer
    );
  });
});
