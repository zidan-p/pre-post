

export function convertToArrayNotation(obj: Record<string, any>, parentKey: string = '', result: Record<string, any> = {}): Record<string, any> {
  for (const key in obj) {
    if (key in obj) {
      const newKey = parentKey ? `${parentKey}[${key}]` : key;
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        convertToArrayNotation(obj[key], newKey, result);
      } else {
        result[newKey] = obj[key];
      }
    }
  }
  return result;
}


export function convertToDotNotation(obj: Record<string, any>, parentKey: string = '', result: Record<string, any> = {}): Record<string, any> {
  for (const key in obj) {
    if (key in obj) {
      const newKey = parentKey ? `${parentKey}.${key}` : key;
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        convertToDotNotation(obj[key], newKey, result);
      } else {
        result[newKey] = obj[key];
      }
    }
  }
  return result;
}



export function isObjectExcludeArray(o: any) {
  return o !== null && typeof o === 'object' && Array.isArray(o) === false;
}