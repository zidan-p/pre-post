import { join } from "path";
// register alias

// import 'module-alias/register';
require("module-alias")(join(__dirname, ".."));

// console.log(require.resolve("."));

console.log(require.resolve("~/common/exceptions"));

// start app
import "./common/infra/main";