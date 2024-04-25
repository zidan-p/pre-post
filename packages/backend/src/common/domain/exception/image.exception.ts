import { DomainError } from "~/common/core/DomainError";
import { Result } from "~/common/core/Result";
import { InvalidStateException, UnsavedEntityException } from "~/common/exceptions";
import { CommonImageEntity } from "../common/common-image.entity.base";
import { SingleImageManager } from "../common/single-image-manager.domain";




export namespace SingleImageManagerDomainErrors {

  export class UnsavedImage<TImage extends SingleImageManager<CommonImageEntity>> extends Result<TImage, UnsavedEntityException>{
    constructor( message: string = "unsaved image to the database"){
      super(false, new UnsavedEntityException(message));
    }
  }

  export class NoNewImage<TImage extends SingleImageManager<CommonImageEntity>> extends Result<TImage, InvalidStateException>{
    constructor(message : string = "No new image added for this domain"){
      super(false, new InvalidStateException(message));
    }
  }

  export class InvalidOldImageState<TImage extends SingleImageManager<CommonImageEntity>> extends Result<TImage, InvalidStateException>{
    constructor(message : string = "previouse image have not been deleted"){
      super(false, new InvalidStateException(message));
    }
  }
}