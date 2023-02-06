import { jest, test, expect, describe, beforeEach } from '@jest/globals';

import template from '../../src/templates/index.js';
import {
  repositoryTemplateMock,
  serviceTemplateMock,
  factoryTemplateMock,
} from './mocks/index';

const { repositoryTemplate, serviceTemplate, factoryTemplate } = template;

describe('#Codegen 3-layers arch', () => {
  const componentName = 'product';
  const repositoryName = `${componentName}Repository`;
  const serviceName = `${componentName}Service`;
  const factoryName = `${componentName}Factory`;

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  test('#should generate repository template', () => {
    const expected = {
      filename: repositoryName,
      template: repositoryTemplateMock,
    };

    const result = repositoryTemplate(componentName);

    expect(result).toStrictEqual(expected);
  });

  test('#should generate service template', () => {
    const expected = {
      filename: serviceName,
      template: serviceTemplateMock,
    };

    const result = serviceTemplate(componentName, repositoryName);

    expect(result).toStrictEqual(expected);
  });

  test('#should generate factory template', () => {
    const expected = {
      filename: factoryName,
      template: factoryTemplateMock,
    };

    const result = factoryTemplate(componentName, repositoryName, serviceName);

    expect(result).toStrictEqual(expected);
  });
});
