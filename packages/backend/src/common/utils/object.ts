


/**
 * 
 * @param obj object to be mapped
 * @param func map function
 * @returns objec mapped object
 * @example
 * ```
 * const serializerFunction = (value) => {
 *  return p + 2;
 * }
 * const targetObject = {
 *  a: 12,
 *  b: 13,
 * }
 * const result = objectMap(targetObject, serializerFunction);
 * 
 * result // {a: 15, b: 15}
 * ```
 */
function objectMap<
  TRecord extends Record<string, any>, 
  TValueResult
>(
  obj: TRecord, 
  func: (arg: TRecord[keyof TRecord]) => TValueResult 
)
  : Record<string, TValueResult> 
{
  return Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, func(v)]));
}




/**
 * check if object empty, return true if empty
 * @param obj test object
 * @returns 
 */
function isEmpty(obj: object): boolean {
  for (const i in obj) return false;
  return true;
}
