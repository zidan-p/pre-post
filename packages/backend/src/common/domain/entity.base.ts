
import { UniqueEntityID } from './unique-entitiy';

const isEntity = (v: any): v is Entity<any> => {
  return v instanceof Entity;
};

export abstract class Entity<TProps> {
  protected readonly _id: UniqueEntityID;
  public readonly props: TProps;

  constructor (props: TProps, id?: UniqueEntityID) {
    this._id = id ? id : new UniqueEntityID();
    this.props = props;
  }

  public equals (object?: Entity<TProps>) : boolean {

    if (object == null || object == undefined) {
      return false;
    }

    if (this === object) {
      return true;
    }

    if (!isEntity(object)) {
      return false;
    }

    return this._id.equals(object._id);
  }
}