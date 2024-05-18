import { DomainError } from "~/common/core/domain.error.base";
import { Result } from "~/common/core/result";
import { ConflictException, UnsavedEntityException } from "~/common/exceptions";
import { CommonImageEntity } from "../common/common-image.entity.base";
import { SingleImageManager } from "../common/single-image-manager.domain";




export namespace SingleImageManagerDomainErrors {

  export class UnsavedImage<TImage extends SingleImageManager<CommonImageEntity>> extends Result<TImage, UnsavedEntityException>{
    constructor( message: string = "unsaved image to the database"){
      super(false, new UnsavedEntityException(message));
    }
  }

  export class NoNewImage<TImage extends SingleImageManager<CommonImageEntity>> extends Result<TImage, ConflictException>{
    constructor(message : string = "No new image added for this domain"){
      super(false, new ConflictException(message));
    }
  }

  export class InvalidOldImageState<TImage extends SingleImageManager<CommonImageEntity>> extends Result<TImage, ConflictException>{
    constructor(message : string = "previouse image have not been deleted"){
      super(false, new ConflictException(message));
    }
  }
}