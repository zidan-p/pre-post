import { z } from "zod";
import { Result } from "~/common/core/Result";
import { ValueObject } from "~/common/domain/Value-object";
import { ZodValidationException } from "~/common/exceptions";








interface PostTitleProps {
  value: string;
}


export class PostTitle extends ValueObject<PostTitleProps>{

  // max length in letter
  public static maxLength: number = 200;
  
  public static postTitleSchema = z.string().max(this.maxLength);
  
  get value(): string {
    return this.props.value;
  }

  private constructor(props: PostTitleProps){
    super(props);
  }

  public static create(props: PostTitleProps): Result<PostTitle>{
    const parseResult = this.postTitleSchema.safeParse(props.value);
    if(parseResult.success === false){
      return Result.fail<PostTitle>(new ZodValidationException("error when validating post title", parseResult.error));
    }

    return Result.ok<PostTitle>(new PostTitle(props));
  }

}