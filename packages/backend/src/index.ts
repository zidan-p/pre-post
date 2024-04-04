import { join } from "path";

// register env
import "./config/env-config";

// register alias
require("module-alias")(join(__dirname, ".."));


// start app
import "./common/infra/main";