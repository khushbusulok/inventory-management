import { Application } from "express";
import usersRouter from "./users";

export const setup = (app: Application) => {
  console.log('setup is being called')
  app.use("/api/user", usersRouter);
}

