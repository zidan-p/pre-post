import winston, { addColors, createLogger, format, transports } from "winston";
import { ConsoleTransportInstance } from "winston/lib/winston/transports";
const { combine, timestamp, printf, colorize, errors, json} = format;
import { IPrePostLogger } from "~/common/core/logger.interface";


interface NestCustomLevels extends winston.Logger {
  fatal : winston.LeveledLogMethod,
  error : winston.LeveledLogMethod,
  warn : winston.LeveledLogMethod,
  info : winston.LeveledLogMethod,
  debug : winston.LeveledLogMethod,
  verbose: winston.LeveledLogMethod
}

// default level in winston
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const nestLevel :  winston.config.AbstractConfigSet = {
  levels : {
    fatal : 0,
    error : 1,
    warn : 2,
    info : 3,
    debug : 4,
    verbose: 5
  },
  colors: {
    fatal : "black whiteBG",
    error : "red",
    warn : "yellow",
    info : "green",
    debug : "blue",
    verbose: "gray"
  }
};

// colors for console
/**
 * For example if you want part of the text in red color, just do console.log with:\
 * ```
 * "\x1b[31m this will be red \x1b[91m and this will be normal"
 * ```
 */
const colours = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  dim: "\x1b[2m",
  underscore: "\x1b[4m",
  blink: "\x1b[5m",
  reverse: "\x1b[7m",
  hidden: "\x1b[8m",
  
  fg: {
    black: "\x1b[30m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    magenta: "\x1b[35m",
    cyan: "\x1b[36m",
    white: "\x1b[37m",
    gray: "\x1b[90m",
    crimson: "\x1b[38m" // Scarlet
  },
  bg: {
    black: "\x1b[40m",
    red: "\x1b[41m",
    green: "\x1b[42m",
    yellow: "\x1b[43m",
    blue: "\x1b[44m",
    magenta: "\x1b[45m",
    cyan: "\x1b[46m",
    white: "\x1b[47m",
    gray: "\x1b[100m",
    crimson: "\x1b[48m"
  }
};

const consoleFormat = combine(
  errors({stack: true}),
  colorize({ all: true }),
  timestamp({
    format: 'YYYY/MM/DD,hh:mm:ss.SSS A',
  }),
  // align(),
  printf((info) => {
    let str = "";
    str += `${colours.fg.yellow}[${info.name}] - ${process.pid} - `;
    str += `${colours.fg.white} ${info.timestamp} [${info.context}] `;
    str += `${info.level} : ${info.message} ${info.stack ?? ""}`;
    
    // print additional data that passed trough dataArr
    if(info?.dataArr?.length){
      info.dataArr.forEach(arg => {
        if(typeof arg === 'object' && arg !== null){
          str += "\n ------------------------------------- \n" + JSON.stringify(info.dataArr, null, 2)
        }else if(typeof arg === "string" || typeof arg === "number" ){
          str += "\n ------------------------------------- \n" + arg;
        }else{
          console.log("unhandled value");
          console.log(arg);
        }
      })
    }

    return str;
  })
) 

const fileFormat = combine(
  errors({stack: true}),
  json()
)

export class WinstonPrePostLoggger implements IPrePostLogger {

  private logger: NestCustomLevels;
  private name : string;

  constructor(name: string){
    this.name = name;

    const transportWinston: ConsoleTransportInstance[] = [];
    transportWinston.push( new transports.Console({ format: consoleFormat}));
    
    this.logger = <NestCustomLevels>createLogger({
      levels: nestLevel.levels,
      level: process.env.NODE_ENV === "production" ? "info" : "verbose",
      format: format.combine(
        format.timestamp(),
        format.json()
      ),
      transports: transportWinston,
    });

    addColors(nestLevel.colors);
  }

  // context vari always in the end
  
  log(message: any, ...optionalParams: any[]) {

    const context = optionalParams.pop();
    this.logger.info(message, {context, name: this.name, dataArr: optionalParams});
  }

  error(message: any, stackOrObject?: string | Record<string, any>, ...optionalParams: any[]) {
    const context = optionalParams.pop();
    if(typeof stackOrObject === "string"){
      this.logger.error(message, {context, name: this.name, stack: stackOrObject, dataArr: optionalParams});
      return;
    }

    this.logger.error(message, {context, name: this.name, dataArr: [...optionalParams, stackOrObject] })
  }

  warn(message: any, ...optionalParams: any[]) {
    const context = optionalParams.pop();
    this.logger.warn(message, {context, name: this.name, dataArr: optionalParams});
  }

  debug?(message: any, ...optionalParams: any[]) {
    const context = optionalParams.pop();
    this.logger.debug(message, {context, name: this.name, dataArr: optionalParams});
  }

  verbose?(message: any, ...optionalParams: any[]) {
    const context = optionalParams.pop();
    this.logger.verbose(message, {context, name: this.name, dataArr: optionalParams});
  }

  fatal?(message: any, stackOrObject: string | Record<string, any>, ...optionalParams: any[]) {
    const context = optionalParams.pop();
    if(typeof stackOrObject === "string"){
      this.logger.fatal(message, {context, name: this.name, stack: stackOrObject, dataArr: optionalParams});
      return;
    }
    this.logger.fatal(message, {context, name: this.name, dataArr: [...optionalParams, stackOrObject]})
  }

}