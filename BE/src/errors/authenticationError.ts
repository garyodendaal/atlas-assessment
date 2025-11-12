import { AtlasError } from '@ts-types/error';

/**
 *
 */
export default class AuthenticationError extends Error {
  status: number;

  constructor(message: string, status = 403) {
    super(message);
    this.name = 'AuthenticationError';
    this.status = status;

    // Restore prototype chain (important when extending Error)
    Object.setPrototypeOf(this, new.target.prototype);
  }

  toJSON() {
    return {
      name: this.name,
      status: this.status,
      message: this.message,
      stack: this.stack,
    };
  }

  toString() {
    return `${this.name} [${this.status}]: ${this.message}`;
  }
}
