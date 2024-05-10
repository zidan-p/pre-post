


/**
 * 
 * @param obj object to be mapper
 * @param func mapp function
 * @returns obec mapped object
 */
function objectMap<
  TRecord extends Record<string, TValue>, 
  TValue , 
  TValueResult
>(
  obj: TRecord, 
  func: (arg: TValue) => TValueResult 
)
  : Record<string, TValueResult> 
{
  return Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, func(v)]));
}