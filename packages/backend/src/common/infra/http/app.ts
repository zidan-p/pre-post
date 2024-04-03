import express, { urlencoded } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { v1 } from './api/v1';

const origin = {
  // origin: isProduction ? 'https://dddforum.com' : '*',
  origin: "*"
}

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors({origin: "*"}));

app.use(v1);
app.get("/", (req, res) => res.json({msg: "hallooo"}));


app.listen(3006, () => {
  console.log("app listening in locahost:3006");
})
console.log(app._router);

export {app}