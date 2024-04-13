import { Result } from "~/common/core/Result";
import { UnsavedEntityException } from "~/common/exceptions";


interface IDomainError {
  message: string;
}

export abstract class DomainError implements IDomainError {
  public readonly message: string;
  
  constructor (message: string) {
    this.message = message;
  }
}


export namespace PostDomainErrors {

  export class ImageNotSavedInDatabase extends Result<DomainError, UnsavedEntityException>{
    constructor(message ?: string){
      super(false, new UnsavedEntityException(message));
    }
  }
}