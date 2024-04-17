import cookieParser from "cookie-parser";
import express,{ NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
// import { Logger } from "morgan";
import path from "path";
import { setup } from './app/routes/index'
import morgan from "morgan";
import mongoose from 'mongoose';
import dbConfig from './config/db.config';
import session from "express-session";
import MongoStore from "connect-mongo";
import authRouter from "./app/routes/auth";
import cors from "cors";
// var createError = require('http-errors');
// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

declare module 'express-session' {
  export interface SessionData {
    users: { [key: string]: any };
  }
}


var app = express();
app.use(cors({
  credentials: true,
  origin: "http://localhost:3000"
}))
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  name: 'my_cookie',
  secret: 'ppkk55666655kkppkk55666655kkppkk55666655kkpp',
  store: MongoStore.create({
      mongoUrl: `mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`
  })
}));

mongoose.connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`)
  .then(() => {
    console.log('Connected!')
  })
  .catch((err: any) => {
    console.log("connection error", err);
    process.exit();
  })

// app.get('/', function(req: Request, res:Response, next:NextFunction) {
//     res.send('welcome');
// });

app.use("/api/auth", authRouter);
  
app.use(async function(req: Request, res: Response, next: NextFunction){
  console.log(req.session.users,"----------")
  if(req.session.users){
    console.log('a call n thai ema j mja chhe 1')
    next();
  } else {
    res.status(401).json({message: 'you are not authorized please login'})
  }
})

setup(app);

// catch 404 and forward to error handler
app.use(function(req:Request, res:Response, next: NextFunction) {
  console.log('a call n thai ema j mja chhe 404')
  next(createHttpError(404));
});

// error handler
app.use(function(err:any, req:Request, res:Response, next:NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
