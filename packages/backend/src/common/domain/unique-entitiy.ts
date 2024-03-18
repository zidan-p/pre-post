
import { v4 as uuid } from 'uuid';
import { Identifier } from './Identifier'

export class UniqueEntityID{

  private value: string | number;

  constructor (id?: string | number) {
    this.value = id ? id : uuid();
  }

  equals (id?: UniqueEntityID): boolean {
    if (id === null || id === undefined) {
      return false;
    }
    if (!(id instanceof this.constructor)) {
      return false;
    }
    return id.toValue() === this.value;
  }

  toString () {
    return String(this.value);
  }

  /**
   * Return raw value of identifier
   */

  toValue (): string | number {
    return this.value;
  }
}