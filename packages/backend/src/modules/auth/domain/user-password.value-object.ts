import { ValueObject } from "~/common/domain/Value-object";
import bcrypt = require('bcrypt');
import { z } from "zod";
import { Result } from "~/common/core/Result";
import { ZodValidationException } from "~/common/exceptions";



export interface IUserPasswordProps {
  value: string;

  /**
   * wheter or not the value provided already hashed
   */
  hashed?: boolean;
}


export class UserPassword extends ValueObject<IUserPasswordProps> {

  public static minLength: number = 6;
  public static userPasswordSchema = z
    .object({
      value: z.string(),
      hashed: z.boolean().optional()
    })
    .refine(
      arg => !(arg?.hashed && arg.value.length < this.minLength),
      {
        message: "Min value of password is " + this.minLength,
        path: ["value"]
      }
    )
  
  get value () : string {
    return this.props.value;
  }

  private constructor (props: IUserPasswordProps) {
    super(props);
  }

  /**
   * @method comparePassword
   * @desc Compares as plain-text and hashed password.
   */

  public async comparePassword (plainTextPassword: string): Promise<boolean> {
    let hashed: string;
    if (this.isAlreadyHashed()) {
      hashed = this.props.value;
      return this.bcryptCompare(plainTextPassword, hashed);
    } else {
      return this.props.value === plainTextPassword;
    }
  }

  private bcryptCompare (plainText: string, hashed: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      bcrypt.compare(plainText, hashed, (err, compareResult) => {
        if (err) return resolve(false);
        return resolve(compareResult);
      })
    })
  }

  public isAlreadyHashed (): boolean {
    return this.props.hashed;
  }
  
  private hashPassword (password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) return reject(err);
        resolve(hash)
      })
    })
  }

  public getHashedValue (): Promise<string> {
    return new Promise((resolve) => {
      if (this.isAlreadyHashed()) {
        return resolve(this.props.value);
      } else {
        return resolve(this.hashPassword(this.props.value))
      }
    })
  }

  public static create (props: IUserPasswordProps): Result<UserPassword> {

    const result = this.userPasswordSchema.safeParse(props);

    if(result.success === false){
      console.error(result.error);
      return Result.fail<UserPassword>(
        new ZodValidationException("Fail validating user passowrd", result.error)
      )
    }

    return Result.ok<UserPassword>(new UserPassword({
      value: props.value,
      hashed: !!props.hashed === true
    }));
  }
}