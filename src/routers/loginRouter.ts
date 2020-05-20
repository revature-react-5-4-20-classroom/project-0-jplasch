import express, { Router, Request, Response, NextFunction } from "express";


export const loginRouter: Router = express.Router();

loginRouter.get('/', async (req: Request, res: Response) => {
    res.send('Please Login');
});

loginRouter.post('/', async (req: Request, res: Response) => {
     
});