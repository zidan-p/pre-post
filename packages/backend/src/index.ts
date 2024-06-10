import { join } from "path";
import { AppMainInfra } from "./common/infra/main";

// register env
import "./config/env-config";

// register alias
require("module-alias")(join(__dirname, ".."));

const app = new AppMainInfra();
app.load();
