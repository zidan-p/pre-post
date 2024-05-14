import { ExceptionBase } from "../exceptions";

interface IServiceError {
  message: string;
}

export abstract class ServiceError extends ExceptionBase implements IServiceError{
  public readonly message: string;
  
  constructor (message: string, cause?: Error, metadata?: unknown) {
    super(message, cause, metadata);
    this.message = message;
  }
}
