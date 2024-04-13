import { WinstonPrePostLoggger } from "~/common/infra/logger/winston/pre-post-logger.winston";
/**
 * the implementation of ther core...
 * 
 * used when yo want to use some common service but doesnt want to create another creator 
 * when creating it.
 * 
 * this file is only used for brige the real infra to common core implementation.
 * still, the definition of actual service in infra section.
 */


export class PrePostLogger extends WinstonPrePostLoggger { 
  constructor(){ super("pre-post-service") }
}