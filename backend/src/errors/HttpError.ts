export class HttpError extends Error {
    constructor(
      public statusCode: number,
      message: string
    ) {
      super(message);
      this.name = this.constructor.name;
      Error.captureStackTrace(this, this.constructor);
    }
  }
export class BadRequestError extends HttpError {
    constructor(message: string) {
      super(400, message);
    }
  }
  
  export class NotFoundError extends HttpError {
    constructor(message: string) {
      super(404, message);
    }
  }
  
  export class InternalServerError extends HttpError {
    constructor(message: string) {
      super(500, message);
    }
  }