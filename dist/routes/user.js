"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const userRouter = (0, express_1.default)();
const jwtUserPassword = process.env.JWT_USER_PASSWORD;
console.log(jwtUserPassword);
module.exports = {
    userRouter: userRouter,
};
