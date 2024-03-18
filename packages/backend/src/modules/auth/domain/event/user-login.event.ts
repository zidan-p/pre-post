import { IDomainEvent } from "~/common/domain/events/domain-event.interface";
import { UniqueEntityID } from "~/common/domain/unique-entitiy";
import { User } from "~/modules/auth/domain/user.agregate-root";


export class UserLoggedIn implements IDomainEvent {
  public dateTimeOccurred: Date;
  public user: User;

  constructor (user: User) {
    this.dateTimeOccurred = new Date();
    this.user = user;
  }

  public getAggregateId (): UniqueEntityID {
    return this.user.id;
  }
}