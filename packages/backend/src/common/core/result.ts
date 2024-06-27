import { ExceptionBase } from "../exceptions";

export class Result<T, E extends ExceptionBase = ExceptionBase> {
  public isSuccess: boolean;
  public isFailure: boolean
  private error: E;
  private _value: T;

  /**
   * Constructor for creating a Result instance.
   *
   * @param {boolean} isSuccess - Indicates if the result is successful.
   * @param {E | null} error - The error associated with the result.
   * @param {T} value - The value associated with the result.
   */
  public constructor (isSuccess: boolean, error?: E | null, value?: T) {
    if (isSuccess && error) {
      throw new Error("InvalidOperation: A result cannot be successful and contain an error");
    }
    if (!isSuccess && !error) {
      throw new Error("InvalidOperation: A failing result needs to contain an error message");
    }

    this.isSuccess = isSuccess;
    this.isFailure = !isSuccess;

    // @ts-ignore
    this.error = error;
    // @ts-ignore
    this._value = value;
    
    Object.freeze(this);
  }

  public getValue () : T {
    if (!this.isSuccess) {
      console.log(this.error,);
      throw new Error("Can't get the value of an error result. Use 'errorValue' instead.")
    } 

    return this._value;
  }

  public getErrorValue () {
    return this.error;
  }

  public static ok<U, E extends ExceptionBase = ExceptionBase> (value?: U) : Result<U> {
    return new Result<U, E>(true, null, value);
  }

  public static fail<U, E extends ExceptionBase = ExceptionBase> (error: E): Result<U> {
    return new Result<U>(false, error);
  }

  public static combine <T extends any = any>(results: Result<T>[]) : Result<T> {
    for (let result of results) {
      if (result.isFailure) return result;
    }
    return Result.ok();
  }

  /**
   * make sure to check it with combine before get its value
   * @param results 
   * @returns 
   */
  public static getCombinedValue <T>(results: Result<T>[]) : T[] {
    let values: T[] = []
    for (let result of results) {
      values.push(result.getValue())
    }
    return values;
  }
}

export type Either<L, A> = Left<L, A> | Right<L, A>;

export class Left<L, A> {
  readonly value: L;

  constructor(value: L) {
    this.value = value;
  }

  isLeft(): this is Left<L, A> {
    return true;
  }

  isRight(): this is Right<L, A> {
    return false;
  }
}

export class Right<L, A> {
  readonly value: A;

  constructor(value: A) {
    this.value = value;
  }

  isLeft(): this is Left<L, A> {
    return false;
  }

  isRight(): this is Right<L, A> {
    return true;
  }
}

export const left = <L, A>(l: L): Either<L, A> => {
  return new Left(l);
};

export const right = <L, A>(a: A): Either<L, A> => {
  return new Right<L, A>(a);
};