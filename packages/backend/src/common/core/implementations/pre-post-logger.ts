import { WinstonPrePostLoggger } from "~/common/infra/logger/winston/pre-post-logger.winston";
/**
 * the implementation of the core...
 * 
 * used when yo want to use some common service but doesnt want to create another creator 
 * when creating it.
 * 
 * this file is only used for bring the real infra to core implementation.
 * still, the definition of actual service in infra section.
 */


export class PrePostLogger extends WinstonPrePostLoggger { 
  constructor(){ super("pre-post-service") }
}