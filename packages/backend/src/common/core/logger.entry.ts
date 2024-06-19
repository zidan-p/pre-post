import { WinstonPrePostLoggger } from "../infra/logger/winston/pre-post-logger.winston";


// entry file for logger, so it can used in anydomain
export const prePostLogger = new WinstonPrePostLoggger("pre-post")

