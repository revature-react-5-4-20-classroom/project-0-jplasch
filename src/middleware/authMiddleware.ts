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
          res.status(401).send('Since you were curious regarding why I asked you to login, I changed the message since I do not like curiosity; curiosity killed nearly all of my cats.\nAs such, instead of posing you a quesiton, this message will now merely assert that you \'doaf STATUS\' is set to MAXIMAL. Good day, fellow Chad!');
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