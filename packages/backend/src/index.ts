import { join } from "path";
// register alias
require("module-alias")(join(__dirname, ".."));
// register env
import "./config/env-config";


import { AppMainInfra } from "./common/infra/main";



const app = new AppMainInfra();
app.load();
