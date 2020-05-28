import express, { Router, Request, Response, NextFunction } from "express";
import { findReimbursementByStatus, findReimbursementByUser } from "../repository/reimbursement-data-access";
import { updateReimbursement } from "../repository/reimbursement-data-update";
import { authRoleFactory } from "../middleware/authMiddleware";
import { Reimbursement } from "../models/Reimbursement";

export const reimbursementRouter : Router = express.Router();

// allowed roles: finance-manager - apply auth middleware to allow access
reimbursementRouter.use(authRoleFactory(['finance-manager']));
reimbursementRouter.use(authRoleFactory(['Admin']));

reimbursementRouter.get('/status/:id', async (req: Request, res: Response) => {
    const id = +req.params.id;
    if(isNaN(id)) {
        res.status(400).send('Must be numeric path');
    } else {
        const reimbursementStatusId: Reimbursement[] = await findReimbursementByStatus(id);
        res.json(reimbursementStatusId);
        console.log(reimbursementStatusId);
    }
});

reimbursementRouter.get('/author/userId/:id', async (req: Request, res: Response) => {
    const id = +req.params.id;
    if(isNaN(id)) {
        res.status(400).send('Must be numeric path');
    } else {
        const reimbursementUserId: Reimbursement[] = await findReimbursementByUser(id);
        res.json(reimbursementUserId);
        console.log(reimbursementUserId);
    }
});

reimbursementRouter.post('/', async (req: Request, res: Response) => {
    let {reimbursementId, author, amount, dateSubmitted,
        dateResolved, description, resolver, status, type} = req.body;
    if(reimbursementId&&author&&amount&&dateSubmitted&&dateResolved&&description&&resolver
        &&status&&type) {
        updateReimbursement(reimbursementId, author, amount, dateSubmitted, dateResolved,
            description, resolver, status, type);
        res.sendStatus(201);
    } else {
        res.status(400).send('Please include all fields');
    }
});