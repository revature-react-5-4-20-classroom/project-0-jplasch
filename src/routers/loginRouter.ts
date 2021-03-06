import express, { Router, Request, Response, NextFunction } from "express";
import { findUserByUsernamePassword } from "../repository/user-data-access";


export const loginRouter: Router = express.Router();

// loginRouter.get('/', async (req: Request, res: Response) => {
//     res.send('Please Login');
// });


loginRouter.get('/', async(req: Request, res:Response) => {
  res.send('This is the login page. Please login.');
});

loginRouter.post('/', async (req: Request, res: Response) => {
    console.log('first place to look');
    console.log(req.session);
    console.log(req.body);
    const {username, password} = req.body;
    if( !username || !password) {
      res.status(400).send('Please include username and password fields for login');
    } else {
      try {
        console.log('first print:');
        console.log(req.session);
        const user = await findUserByUsernamePassword(username, password);
        if(req.session) {
          console.log(req.session.user);
          req.session.user = user;
        }
        //send the user back, as a favor to our future selves
        res.json(user);
      } catch (e) {
        console.log(e.message);
        res.status(401).send('Failed to authenticate username and password');
      }
    }
  });