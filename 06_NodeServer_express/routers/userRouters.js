const express = require('express');

const userRouter = express.Router();

userRouter.get('/', (req, res, next) => {
  res.json('get user list');
});
userRouter.get('/:id', (req, res, next) => {
  res.json('get user detail');
});
userRouter.post('/', (req, res, next) => {
  res.json('create user');
});
userRouter.patch('/:id', (req, res, next) => {
  res.json('update user');
});
userRouter.delete('/:id', (req, res, next) => {
  res.json('delete user', req.params.id);
});

module.exports = userRouter;
