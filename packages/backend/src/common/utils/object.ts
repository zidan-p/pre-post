


/**
 * 
 * @param obj object to be mapper
 * @param func mapp function
 * @returns obec mapped object
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
