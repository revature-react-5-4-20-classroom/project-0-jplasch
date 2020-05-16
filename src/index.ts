import express, { Application } from "express";
import bodyParser from "body-parser";
import { loggingMiddleware } from "./middleware/loggingMiddleware";

const app : Application = express();

app.use(bodyParser.json());
app.use(loggingMiddleware);
app.listen(1999, ()=>{
    console.log('app has started...');
})