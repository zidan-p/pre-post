




export type ObjectArrayableValue<T extends object> = {[P in keyof T]: T[P][]}