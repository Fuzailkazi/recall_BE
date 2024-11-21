import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
require('dotenv').config();

const app = express();
app.use(express.json());

console.log(process.env.MONGODB_URL!);

app.post('api/v1/signup', (req, res) => {});

app.post('api/v1/signin', (req, res) => {});

app.post('api/v1/content', (req, res) => {});

app.get('api/v1/content', (req, res) => {});

app.delete('api/v1/content', (req, res) => {});

app.post('api/v1/brain/share', (req, res) => {});

app.post('api/v1/brain/:shareLink', (req, res) => {});
