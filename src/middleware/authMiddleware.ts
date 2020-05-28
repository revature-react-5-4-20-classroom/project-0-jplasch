import express, { NextFunction, Request, Response } from 'express';
import { userRouter } from '../routers/userRouter';
import { findUsers } from '../repository/user-data-access';

export function authRoleFactory(roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
      if(!req.session || !req.session.user) {
        res.status(401).send('Please login');
      } else {
        let allowed = false;
        for(let role of roles) {
          if(req.session.user.role === role || '/' + req.session?.user.userId === req.path) {
            allowed = true;
          }
        }
        if(allowed) {
          next();
        } else {
          res.status(403).send(`Not authorized with role: ${req.session.user.role}`);
        }
      }
    }
}

// export function unless(middleware: Function) {
//   return function(req: Request, res: Response, next: NextFunction) {
//       if ( '/' + req.session?.user.userId === req.path) {
//           return next();
//       } 
//       else {
//           return middleware(req, res, next);
//       }
//   };
// };
