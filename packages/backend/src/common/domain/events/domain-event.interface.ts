
import { UniqueEntityID } from "../unique-entitiy";

export interface IDomainEvent {
  dateTimeOccurred: Date;
  getAggregateId (): UniqueEntityID;
}

