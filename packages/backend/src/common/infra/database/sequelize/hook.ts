import { Model } from "sequelize";
import { DomainEvents } from "~/common/domain/events/domain-event";
import { UniqueEntityID } from "~/common/domain/unique-entitiy";
import { Post } from "./models/Post.model";
import { User } from "./models/User.model";




const dispatchEventsCallback = (model: Model<any>, primaryKeyField: string) => {
  const aggregateId = new UniqueEntityID(model[primaryKeyField]);
  DomainEvents.dispatchEventsForAggregate(aggregateId);
}




/**
 * hook for event. so when database operation is succes or complete, it will trigger the handler
 */
export function createHooksForAggregateRoots(){

  Post.addHook('afterCreate', (m) => dispatchEventsCallback(m, 'base_user_id'));
  Post.addHook('afterDestroy', (m) => dispatchEventsCallback(m, 'base_user_id'));
  Post.addHook('afterUpdate', (m) => dispatchEventsCallback(m, 'base_user_id'));
  Post.addHook('afterSave', (m) => dispatchEventsCallback(m, 'base_user_id'));
  Post.addHook('afterUpsert', (m: any) => dispatchEventsCallback(m, 'base_user_id'));

  User.addHook('afterCreate', (m) => dispatchEventsCallback(m, 'base_user_id'));
  User.addHook('afterDestroy', (m) => dispatchEventsCallback(m, 'base_user_id'));
  User.addHook('afterUpdate', (m) => dispatchEventsCallback(m, 'base_user_id'));
  User.addHook('afterSave', (m) => dispatchEventsCallback(m, 'base_user_id'));
  User.addHook('afterUpsert', (m: any) => dispatchEventsCallback(m, 'base_user_id'));

}