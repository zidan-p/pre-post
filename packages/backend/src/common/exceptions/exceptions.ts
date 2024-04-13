import { ZodError } from 'zod';
import {
  ARGUMENT_INVALID,
  ARGUMENT_NOT_PROVIDED,
  ARGUMENT_OUT_OF_RANGE,
  CONFLICT,
  EXPIRED,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  UNSAVED_ENTITY,
  VALIDATION_FAIL,
} from '.';
import { ExceptionBase } from './exception.base';

/**
 * Used to indicate that an incorrect argument was provided to a method/function/class constructor
 *
 * @class ArgumentInvalidException
 * @extends {ExceptionBase}
 */
export class ArgumentInvalidException extends ExceptionBase {
  readonly code = ARGUMENT_INVALID;
}

/**
 * Used to indicate that an argument was not provided (is empty object/array, null of undefined).
 *
 * @class ArgumentNotProvidedException
 * @extends {ExceptionBase}
 */
export class ArgumentNotProvidedException extends ExceptionBase {
  readonly code = ARGUMENT_NOT_PROVIDED;
}

/**
 * Used to indicate that an argument is out of allowed range
 * (for example: incorrect string/array length, number not in allowed min/max range etc)
 *
 * @class ArgumentOutOfRangeException
 * @extends {ExceptionBase}
 */
export class ArgumentOutOfRangeException extends ExceptionBase {
  readonly code = ARGUMENT_OUT_OF_RANGE;
}

/**
 * Used to indicate conflicting entities (usually in the database)
 *
 * @class ConflictException
 * @extends {ExceptionBase}
 */
export class ConflictException extends ExceptionBase {
  readonly code = CONFLICT;
}

/**
 * Used to indicate that entity is not found
 *
 * @class NotFoundException
 * @extends {ExceptionBase}
 */
export class NotFoundException extends ExceptionBase {
  static readonly message = 'Not found';

  constructor(message = NotFoundException.message) {
    super(message);
  }

  readonly code = NOT_FOUND;
}

/**
 * Used to indicate an internal server error that does not fall under all other errors
 *
 * @class InternalServerErrorException
 * @extends {ExceptionBase}
 */
export class InternalServerErrorException extends ExceptionBase {
  static readonly message = 'Internal server error';

  constructor(message = InternalServerErrorException.message) {
    super(message);
  }

  readonly code = INTERNAL_SERVER_ERROR;
}

export class ExpiredException extends ExceptionBase{
  static readonly message = "Expire";

  constructor(message = ExpiredException.message, cause?: Error){
    super(message, cause);
  }

  readonly code = EXPIRED
}


export class ValidationFailException extends ExceptionBase{
  static readonly message = "Validation Error"

  constructor(message = ValidationFailException.message, cause?: Error){
    super(message, cause);
  }

  readonly code = VALIDATION_FAIL;
}


// make it easy to handle validation error
export class ZodValidationException extends ValidationFailException{

  constructor(message, err: ZodError){
    super(message, err);
  }
}


export class UnsavedEntityException extends ExceptionBase {
  static readonly message = "Entity have not saved before processing";
  readonly code = UNSAVED_ENTITY;
  
  constructor(message = UnsavedEntityException.message, cause?: Error){
    super(message, cause)
  }
}