
import { ExceptionBase, UNEXPECTED_ERROR } from "../exceptions";
import { Result } from "./result";
import { UseCaseError } from "./use-case.error.base";

export namespace AppError {
  export class UnexpectedError extends Result<UseCaseError> {
    public constructor (err: any) {
      super(false, {
        message: `An unexpected error occurred.`,
        cause: err,
        name: 'unexpected error',
        code: UNEXPECTED_ERROR,
      } as ExceptionBase)
      console.log(`[AppError]: An unexpected error occurred`);
      console.error(err);
    }

    public static create (err: any): UnexpectedError {
      return new UnexpectedError(err);
    }
  }
}