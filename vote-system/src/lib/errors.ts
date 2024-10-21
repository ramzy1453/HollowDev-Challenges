class ApiError extends Error {
  constructor(public message: string, public statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class BadRequestError extends ApiError {
  constructor(message: string) {
    super(message, 400);
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message: string) {
    super(message, 401);
  }
}

export class ForbiddenError extends ApiError {
  constructor(message: string) {
    super(message, 403);
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string) {
    super(message, 404);
  }
}

export class InternalServerError extends ApiError {
  constructor(message: string) {
    super(message, 500);
  }
}

export class NotImplementedError extends ApiError {
  constructor(message: string) {
    super(message, 501);
  }
}

export class ServiceUnavailableError extends ApiError {
  constructor(message: string) {
    super(message, 503);
  }
}

export class GatewayTimeoutError extends ApiError {
  constructor(message: string) {
    super(message, 504);
  }
}

export default ApiError;
