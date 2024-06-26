/**
 * Adding a `code` string with a custom status code for every
 * exception is a good practice, since when that exception
 * is transferred to another process `instanceof` check
 * cannot be performed anymore so a `code` string is used instead.
 * code constants can be stored in a separate file so they
 * can be shared and reused on a receiving side (code sharing is
 * useful when developing fullstack apps or microservices)
 */
export const ARGUMENT_INVALID = 'GENERIC.ARGUMENT_INVALID';
export const ARGUMENT_OUT_OF_RANGE = 'GENERIC.ARGUMENT_OUT_OF_RANGE';
export const ARGUMENT_NOT_PROVIDED = 'GENERIC.ARGUMENT_NOT_PROVIDED';
export const NOT_FOUND = 'GENERIC.NOT_FOUND';
export const CONFLICT = 'GENERIC.CONFLICT';
export const VALIDATION_FAIL = "GENERIC.VALIDATION_FAIL"
export const INTERNAL_SERVER_ERROR = 'GENERIC.INTERNAL_SERVER_ERROR';
export const UNEXPECTED_ERROR = 'GENERIC.UNEXPECTED_ERROR';
export const PARSE_ERROR = 'GENERIC.PARSE_ERROR';

export const EXPIRED = "AUTH.EXPIRED"
export const FORBIDDEN = "AUTH.FORBIDDEN";
export const UNAUTHORIZED = "AUTH.UNAUTHORIZED";

export const UNSAVED_ENTITY = "DOMAIN.UNSAVED_ENTITY";
export const INVALID_STATE = "DOMAIN.INVALID_STATE";