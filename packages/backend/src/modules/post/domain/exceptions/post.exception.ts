import { Result } from "~/common/core/Result";
import { InvalidStateException, UnsavedEntityException } from "~/common/exceptions";


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

  export class NoNewImage extends Result<DomainError, InvalidStateException>{
    constructor(message : string = "No new image added for this domain"){
      super(false, new InvalidStateException(message));
    }
  }

  export class InvalidOldImageState extends Result<DomainError, InvalidStateException>{
    constructor(message : string = "previouse image have not been deleted"){
      super(false, new InvalidStateException(message));
    }
  }

}