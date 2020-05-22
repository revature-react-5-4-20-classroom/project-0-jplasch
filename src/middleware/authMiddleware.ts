import express, { NextFunction, Request, Response } from 'express';

export const authAdminMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if(!req.session || !req.session.user) {
        res.status(401).send('Please login!');
    } else if (req.session.user.role !== 'admin') {
        res.status(403).send('Not Authorized');
    } else {
        next();
    }
}

export const authFinancialManagerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if(!req.session || !req.session.user) {
        res.status(401).send('Please login!');
    } else if (req.session.user.role !== 'financial-manager') {
        res.status(403).send('Not Authorized');
    } else {
        next();
    }
}

export const authUserMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if(!req.session || !req.session.user) {
        res.status(401).send('Please login!');
    } else if (req.session.user.role !== 'user') {
        res.status(403).send('Not Authorized');
    } else {
        next();
    }
}


export function authRoleFactory(roles: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        if(!req.session || !req.session.user) {
          res.status(401).send('Hey Corey, the doafiest of doafs; I changed the message because apparently you are curious as to why I asked you to login, and I don\'t like curiosity... because it killed nearly all my cats. So suck on that, jack flap');
        } else {
          let allowed = false;
          for(let role of roles) {
            console.log(req.session.user);
            if(req.session.user.role === role) {
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