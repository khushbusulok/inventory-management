import express,{ NextFunction, Request, Response } from "express";

const usersRouter = express.Router();

usersRouter.get('/getUser', function(req: Request, res:Response, next:NextFunction) {
  res.send('respond with a resource');
});

export default usersRouter;
