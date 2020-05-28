import express, { Router, Request, Response, NextFunction } from "express";
import { User } from "../models/User";
import { findUsers, findUsersById } from "../repository/user-data-access";
import { updateUser } from "../repository/user-data-update";
import { authRoleFactory } from "../middleware/authMiddleware";


export const userRouter : Router = express.Router();

// allowed roles: finance-manager - apply auth middleware to allow access
userRouter.use(authRoleFactory(['finance-manager', 'admin']));

userRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users : User[] = await findUsers();
        res.json(users);
    } catch (e) {
        next(e);
    }
})

userRouter.get('/:id', async (req: Request, res: Response) => {
    const id = +req.params.id;
    if(isNaN(id)) {
        res.status(400).send('Must be numeric path');
    } else {
        const userid: User[] = await findUsersById(id);
        res.json(userid);
    }
});

userRouter.patch('/', async (req: Request, res: Response) => {
    let {userId, username, password, firstName, lastName, email, role} = req.body;
    if(true) {
        updateUser(userId, username, password, firstName, lastName, email, role);
        res.sendStatus(201);
    } else {
        res.status(400).send('Please include all fields');
    }
});
