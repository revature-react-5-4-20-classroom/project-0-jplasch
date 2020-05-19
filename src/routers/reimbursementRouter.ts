import express, { Router, Request, Response, NextFunction } from "express";
import { findReimbursementByStatus } from "../repository/reimbursement-data-access";
import { ReimbursementStatus } from "../models/ReimbursementStatus";


export const reimbursementRouter : Router = express.Router();

// allowed roles: finance-manager - apply auth middleware to allow access
//userRouter.use(authRoleFactory(['finance-manager']));

reimbursementRouter.get('/status/:id', async (req: Request,  res: Response, next: NextFunction) => {
    try {
        const rStatus : ReimbursementStatus[] = await findReimbursementByStatus();
        res.json(rStatus);
    } catch (e) {
        next(e);
    }
});