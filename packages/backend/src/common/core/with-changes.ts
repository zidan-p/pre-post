
import { Result } from "./result";

export interface WithChanges {
  changes: Changes;
}

/**
 * useful when working with list of data
 */
export class Changes {
  private changes: Result<any>[];

  constructor () {
    this.changes = [];
  }

  public addChange (result: Result<any>) : void {
    this.changes.push(result);
  }

  public getChangeResult (): Result<any> {
    return Result.combine(this.changes);
  }
}