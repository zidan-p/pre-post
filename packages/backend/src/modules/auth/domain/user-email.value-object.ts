import { ArgumentInvalidException } from "~/common/exceptions";
import { z } from "zod";
import { Result } from "~/common/core/Result";
import { ValueObject } from "~/common/domain/Value-object";


export interface UserEmailProps{
  value: string;
}

export class UserEmail extends ValueObject<UserEmailProps>{

  private static emailSchema = z.string().email();
  
  get value() : string {
    return this.props.value;
  }

  private constructor (prop: UserEmailProps){
    super(prop);
  }

  private static isValidEmail (email: string) {
    const result = this.emailSchema.safeParse(email);
    return result.success;
  }

  private static format (email: string): string {
    return email.trim().toLowerCase();
  }

  public static create (email: string): Result<UserEmail> {
    if (!this.isValidEmail(email)) {
      return Result.fail<UserEmail>(new ArgumentInvalidException("invalid email : " + email));
    } else {
      return Result.ok<UserEmail>(
        new UserEmail({ value: this.format(email) })
      );
    }
  }

}