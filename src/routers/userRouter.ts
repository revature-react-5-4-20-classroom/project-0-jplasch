import express, { Router, Request, Response, NextFunction } from "express";
import { User } from "../models/User";
import { findUsers, findUsersById } from "../repository/user-data-access";
import { updateUser } from "../repository/user-data-update";


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

userRouter.post('/', async (req: Request, res: Response) => {
    let {userId, username, password, firstName, lastName, email, role} = req.body;
    if(userId&&username&&password&&firstName&&lastName&&email&&role) {
        updateUser(userId, username, password, firstName, lastName, email, role);
        res.sendStatus(201);
    } else {
        res.status(400).send('Please include all fields');
    }
});


// userRouter.post('/', (req: Request, res: Response) => {
//     let { id, username, password, email, role } = req.body;
//     if (id && username && password && email && role) {
//         addNewUser(new User(id, username, password, email, role));
//         res.sendStatus(201);
//     } else {
//         res.status(400).send('Please include required fields.');
//     }
// });