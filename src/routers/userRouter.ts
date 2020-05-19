import express, { Request, Response, NextFunction } from "express";
import { Router } from "express";
import { User } from "../models/User";
import { findUsers, findUsersById } from "../repository/user-data-access";


export const userRouter : Router = express.Router();

// allowed roles: finance-manager - apply auth middleware to allow access
//userRouter.use(authRoleFactory(['finance-manager']));

userRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users : User[] = await findUsers();
        res.json(users);
    } catch (e) {
        next(e);
    }
});

userRouter.get('/:id', async (req: Request, res: Response) => {
    const id = +req.params.id;
    if(isNaN(id)) {
        res.status(400).send('Must be numeric path');
    } else {
        res.json(findUsersById(id));
    }
});