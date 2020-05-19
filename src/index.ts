import express, { Application } from "express";
import bodyParser from "body-parser";
import { loggingMiddleware } from "./middleware/loggingMiddleware";
import { sessionMiddleware } from "./middleware/sessionMiddleware";
import { userRouter } from "./routers/userRouter";
import { reimbursementRouter } from "./routers/reimbursementRouter";

const app : Application = express();

app.use(bodyParser.json());
app.use(loggingMiddleware);
app.use(sessionMiddleware);
app.use('/users', userRouter);
app.use('/reimbursements', reimbursementRouter);






app.listen(1999, ()=>{
    console.log('app has started...');
})