import { z } from "zod";
import { Guard } from "~/common/core/guard";
import { Result } from "~/common/core/result";
import { ValueObject } from "~/common/domain/value-object";
import { ZodValidationException } from "~/common/exceptions";



interface UserNameProps {
  name: string;
}

export class UserName extends ValueObject<UserNameProps> {
  public static maxLength: number = 15;
  public static minLength: number = 2;

  public static UsernameScema = z.string().max(this.maxLength).min(this.minLength);

  get value (): string {
    return this.props.name;
  }

  private constructor (props: UserNameProps) {
    super(props);
  }

  public static create (props: UserNameProps): Result<UserName> {

    const parseResult = this.UsernameScema.safeParse(props.name);
    if(parseResult.success === false){
      return Result.fail<UserName>(
        new ZodValidationException("Validation error when creating username", parseResult.error)
      )
    }

    return Result.ok<UserName>(new UserName(props));
  }
}