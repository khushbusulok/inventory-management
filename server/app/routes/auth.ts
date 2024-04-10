import express from "express";
import controller from "../controllers/auth.controller"

const authRouter = express.Router();

authRouter.post('/signin', controller.login);

authRouter.post('/signup', controller.signup);

authRouter.post('/logout', controller.logout);

export default authRouter;
