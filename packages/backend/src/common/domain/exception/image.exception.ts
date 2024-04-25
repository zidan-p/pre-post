import { DomainError } from "~/common/core/DomainError";
import { Result } from "~/common/core/Result";
import { InvalidStateException, UnsavedEntityException } from "~/common/exceptions";




export namespace ImageDomainErrors {

  export class UnsavedImage extends Result<DomainError, UnsavedEntityException>{
    constructor( message: string = "unsaved image to the database"){
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