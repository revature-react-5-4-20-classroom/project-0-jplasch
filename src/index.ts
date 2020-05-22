import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import { loggingMiddleware } from "./middleware/loggingMiddleware";
import { sessionMiddleware } from "./middleware/sessionMiddleware";
import { userRouter } from "./routers/userRouter";
import { reimbursementRouter } from "./routers/reimbursementRouter";
import { loginRouter } from "./routers/loginRouter";

const app : Application = express()

// Check if webhook works by pushing the new endpoint:
app.get('/new-endpoint', (req: Request, res: Response) => {
    res.send('Webhooks worked!');
});

app.use(bodyParser.json());
app.use(loggingMiddleware);
app.use(sessionMiddleware);
app.use('/users', userRouter);
app.use('/reimbursements', reimbursementRouter);
app.use('/login', loginRouter);






app.listen(1999, ()=>{
    console.log('app has started...');
})