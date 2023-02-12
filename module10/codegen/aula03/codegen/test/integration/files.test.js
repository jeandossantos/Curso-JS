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

import { Util } from '../../src/util';

import { createLayersIfNotExists } from '../../src/createLayers.js';
import { createFiles } from '../../src/createFiles.js';

function generateFilePath({
  mainPath,
  defaultMainFolder,
  layers,
  componentName,
}) {
  return layers.map((layer) => {
    const filename = `${componentName}${Util.uppercaseFirstLetter(layer)}.js`;

    return join(mainPath, defaultMainFolder, layer, filename);
  });
}

function getAllFunctionsFromInstance(instance) {
  return Reflect.ownKeys(Reflect.getPrototypeOf(instance)).filter(
    (method) => method !== 'constructor'
  );
}

describe('#Integration File - Files Structure', () => {
  const config = {
    defaultMainFolder: 'src',
    mainPath: '',
    layers: ['repository', 'service', 'factory'].sort(),
    componentName: 'heroes',
  };

  const packageJson = 'package.json';
  const packageJsonLocation = join('./test/integration/mocks', packageJson);

  beforeAll(() => {
    config.mainPath = fs.mkdtempSync(join(tmpdir(), 'layers-'));

    fs.copyFileSync(packageJsonLocation, join(config.mainPath, packageJson));

    createLayersIfNotExists(config);
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

  test('Repository should have create, update, read and delete methods', async () => {
    const myConfig = {
      ...config,
      layers: ['repository'],
    };

    await createFiles(myConfig);

    const [repositoryFilePath] = generateFilePath(myConfig);

    const { HeroesRepository: Repository } = await import(repositoryFilePath);

    expectedNotImplemented = (fs) => {
      expect(fs.call()).rejects.toEqual('method not implemented!');
    };

    const instance = new Repository();
    expectedNotImplemented(instance.create);
    expectedNotImplemented(instance.update);
    expectedNotImplemented(instance.read);
    expectedNotImplemented(instance.delete);
  });

  test('Service should have the same signature of Repository and call all its methods', async () => {
    const myConfig = {
      ...config,
      layers: ['repository', 'service'],
    };

    await createFiles(myConfig);

    const [repositoryFilePath, serviceFilePath] = generateFilePath(myConfig);

    const { HeroesRepository: Repository } = await import(repositoryFilePath);
    const { HeroesService: Service } = await import(serviceFilePath);

    const repository = new Repository();
    const service = new Service({ repository });

    const allRepositoryMethods = getAllFunctionsFromInstance(repository);

    allRepositoryMethods.forEach((method) => {
      jest.spyOn(repository, method).mockResolvedValue();
    });

    //executa todos os métodos de service
    getAllFunctionsFromInstance(service).forEach((method) => {
      service[method].call(service, []);
    });

    allRepositoryMethods.forEach((method) => {
      expect(repository[method]).toHaveBeenCalled();
    });
  });

  test('Factory instance should match layers', async () => {
    const myConfig = {
      ...config,
    };

    await createFiles(myConfig);

    const [factoryFilePath, repositoryFilePath, serviceFilePath] =
      generateFilePath(myConfig);

    const { HeroesRepository: Repository } = await import(repositoryFilePath);
    const { HeroesService: Service } = await import(serviceFilePath);
    const { HeroesFactory: Factory } = await import(factoryFilePath);

    const expectedInstance = new Service({ repository: new Repository() });

    const instance = Factory.getInstance();

    expect(expectedInstance).toMatchObject(instance);
    expect(expectedInstance).toBeInstanceOf(Service);
  });
});
