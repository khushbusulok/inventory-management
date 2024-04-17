import { Application } from "express";
import usersRouter from "./users";

export const setup = (app: Application) => {
  app.use("/api/user", usersRouter);
}

