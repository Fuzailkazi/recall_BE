import Router from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const userRouter = Router();

const jwtUserPassword = process.env.JWT_USER_PASSWORD;

console.log(jwtUserPassword);

module.exports = {
  userRouter: userRouter,
};
