import { Entity } from "./entity.base";
import { IDomainEvent } from "./events/domain-event.interface";
import { DomainEvents } from "./events/domain-event";
import { UniqueEntityID } from "./unique-entitiy";

export abstract class AggregateRoot<TProps> extends Entity<TProps> {
  private _domainEvents: IDomainEvent[] = [];

  get id (): UniqueEntityID {
    return this._id;
  }

  get domainEvents(): IDomainEvent[] {
    return this._domainEvents;
  }

  protected addDomainEvent (domainEvent: IDomainEvent): void {
    // Add the domain event to this aggregate's list of domain events
    this._domainEvents.push(domainEvent);
    // Add this aggregate instance to the domain event's list of aggregates who's
    // events it eventually needs to dispatch.
    DomainEvents.markAggregateForDispatch(this);
    // Log the domain event
    this.logDomainEventAdded(domainEvent);
  }

  public clearEvents (): void {
    this._domainEvents.splice(0, this._domainEvents.length);
  }

  private logDomainEventAdded (domainEvent: IDomainEvent): void {
    const thisClass = Reflect.getPrototypeOf(this);
    const domainEventClass = Reflect.getPrototypeOf(domainEvent);
    console.info(`[Domain Event Created]:`, thisClass?.constructor.name, '==>', domainEventClass?.constructor.name)
  }
}