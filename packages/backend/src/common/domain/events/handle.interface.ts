import {type IDomainEvent } from "./domain-event.interface";


export interface IHandle<T = IDomainEvent> {
  setupSubscriptions(): void;
}
