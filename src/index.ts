import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { ContentModel, LinkModel, UserModel } from './db';
import { JWT_PASSWORD } from './config';
import { userMiddleware } from './middleware';
import { random } from './utils';

const app = express();
app.use(express.json());
mongoose.connect('mongodb://localhost:27017/recallDB');
app.post('/api/v1/signup', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    await UserModel.create({
      username: username,
      password: password,
    });

    res.json({
      message: 'User signed up',
    });
  } catch (e) {
    res.status(411).json({
      message: 'User already exists',
    });
  }
});

app.post('/api/v1/signin', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const existingUser = await UserModel.findOne({
    username,
    password,
  });
  if (existingUser) {
    const token = jwt.sign(
      {
        id: existingUser._id,
      },
      JWT_PASSWORD
    );

    res.json({
      token,
    });
  } else {
    res.status(403).json({
      message: 'Incorrrect credentials',
    });
  }
});

app.post('/api/v1/content', userMiddleware, async (req, res) => {
  const link = req.body.link;
  const type = req.body.type;
  await ContentModel.create({
    link,
    type,
    title: req.body.title,
    //@ts-ignore
    userId: req.userId,
    tags: [],
  });

  res.json({
    message: 'Content added',
  });
});

app.get('/api/v1/content', userMiddleware, async (req, res) => {
  // @ts-ignore
  const userId = req.userId;
  const content = await ContentModel.find({
    userId: userId,
  }).populate('userId', 'username');
  res.json({
    content,
  });
});

app.delete('/api/v1/content', userMiddleware, async (req, res) => {
  const contentId = req.body.contentId;

  await ContentModel.deleteMany({
    contentId,
    // @ts-ignore
    userId: req.userId,
  });

  res.json({
    message: 'Deleted',
  });
});

app.post('/api/v1/brain/share', userMiddleware, async (req, res) => {
  const share = req.body.share;
  if (share) {
    await LinkModel.create({
      userId: req.userId,
      hash: random(10),
    });
  } else {
    await LinkModel.deleteOne({
      userId: req.userId,
    });
  }

  res.json({
    message: 'updated sharable link',
  });
});

app.get('/api/v1/brain/:shareLink', (req, res) => {});

app.listen(3000);
