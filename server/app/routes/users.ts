import express,{ NextFunction, Request, Response } from "express";

const usersRouter = express.Router();

usersRouter.get('/getUser', function(req: Request, res:Response, next:NextFunction) {
  res.send('respond with a resource');
  return res.status(200).json({data: 'respond with a resource', message: 'user get successsfully'});
});

export default usersRouter;
