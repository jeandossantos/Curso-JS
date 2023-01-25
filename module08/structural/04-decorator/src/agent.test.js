import { jest, expect, describe, test, beforeEach } from '@jest/globals';
import { Server } from 'http';

import { injectHttpInterceptor } from './agent.mjs';

const originalHttp = jest.createMockFromModule('http');

describe('#Http interceptor agent', function () {
  beforeEach(() => jest.clearAllMocks());

  const eventName = 'request';
  const request = null;

  test('should not change header', () => {
    const response = { setHeader: jest.fn().mockReturnThis() };
    const serverInstance = new originalHttp.Server();

    serverInstance.emit(eventName, request, response);

    expect(response.setHeader).not.toHaveBeenCalled();
  });
  test('should activate header intercept', () => {
    injectHttpInterceptor();

    const response = { setHeader: jest.fn().mockReturnThis() };

    const serverInstance = new Server();

    serverInstance.emit(eventName, request, response);

    expect(response.setHeader).toHaveBeenCalledWith(
      'X-instrumented-by',
      'ErickWendel'
    );
  });
});
