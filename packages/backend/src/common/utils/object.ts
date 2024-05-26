


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
export function objectMap<TObject extends Record<string, any>, TValueResult>(
  obj: TObject, 
  func: (arg: TObject[keyof TObject]) => TValueResult 
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
export function isEmpty(obj: object): boolean {
  for (const i in obj) return false;
  return true;
}



interface AdvaceObjectMapperKey<TValue>{
  outKey?: string;
  mapper?: (initialValue: TValue) => any;
}

export type AdvaceObjectMapperConfig<TInObject extends Record<string, any>> = {[P in keyof TInObject] ?: AdvaceObjectMapperKey<TInObject[P]>}


/**
 * advance object mapper, it can transform key and value.
 * only type hint for parameter and config included
 * @todo use better type hint for output
 * @param initialObject object to be mspper
 * @param mapperConfig mapper configuration for each key
 * @returns 
 * @example
 * ```ts
 * // or it can be inferred from interface
 * const myObject = {
 *  name: "John doe",
 *  age: 19,
 *  place: ["malang", "banyuwangi", "jogja"]
 * } as const;
 * 
 * const myObjectMapperConfiguration: AdvaceObjectMapperConfig<typeof myObject> = {
 *  age: {
 *    mapper : (initialKeyValue) => initialKeyValue + " years old",
 *  },
 *  name: {
 *    outKey: "fullname",
 *    mapper: (initialValue) => initialValue
 *  },
 *  place: {
 *    mapper: (initialValue) => initialValue.join(",")
 *  }
 * }
 * //                                    v~~~~~~v it can be an interface
 * const mapperResult = objectAdvanceMap(myObject, myObjectMapperConfiguration);
 * ```
 */
export function objectAdvanceMap<TIn extends Record<string, any> >(
  initialObject:TIn , 
  mapperConfig: {[P in keyof TIn] ?: AdvaceObjectMapperKey<TIn[P]>}
){

  const resultContainer: Record<string,any> = {};

  for(const initialObjectKey in initialObject){
    const mapper = mapperConfig[initialObjectKey];
    if(!mapper){
      resultContainer[initialObjectKey] = initialObject[initialObjectKey];
      continue;
    }

    const initialObjectValue = initialObject[initialObjectKey];
    let mappedValue;
    if(mapper.mapper){
      mappedValue = mapper.mapper(initialObjectValue);
    }else{
      mappedValue = initialObjectValue
    }

    if(mapper.outKey){
      resultContainer[mapper.outKey] = mappedValue;
      continue;
    }

    resultContainer[initialObjectKey] = mappedValue

  }

  return resultContainer;
}
