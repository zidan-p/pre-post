import express, { urlencoded } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { v1 } from './api/v1';

const origin = {
  // origin: isProduction ? 'https://dddforum.com' : '*',
  origin: "*"
}

const app = express();

const arouter = express.Router();

// arouter.get("/this", (req, res) => res.json({hello: "hai"}));


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors({origin: "*"}));

app.use(v1);
// app.use("/",arouter);
app.get("/", (req, res) => res.json({msg: "hallooo"}));


app.listen(3006, () => {
  console.log("app listening in http://localhost:3006");
})

export {app}