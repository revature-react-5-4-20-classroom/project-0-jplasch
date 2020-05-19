import express, { Router, Request, Response, NextFunction } from "express";
import { findReimbursementByStatus, findReimbursementByUser } from "../repository/reimbursement-data-access";

export const reimbursementRouter : Router = express.Router();

// allowed roles: finance-manager - apply auth middleware to allow access
//userRouter.use(authRoleFactory(['finance-manager']));

reimbursementRouter.get('/status/:id', async (req: Request, res: Response) => {
    const id = +req.params.id;
    if(isNaN(id)) {
        res.status(400).send('Must be numeric path');
    } else {
        res.json(findReimbursementByStatus(id));
    }
});

reimbursementRouter.get('/author/userId/:id', async (req: Request, res: Response) => {
    const id = +req.params.id;
    if(isNaN(id)) {
        res.status(400).send('Must be numeric path');
    } else {
        res.json(findReimbursementByUser(id));
    }
});