import BaseError from './base/baseError.js';

export class BusinessError extends BaseError {
  constructor(message) {
    super({
      message,
    });
  }
}
