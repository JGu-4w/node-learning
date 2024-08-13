const express = require('express');
const userRouter = require('./routers/userRouters');

const app = express();

app.use('/user', userRouter);

app.listen(8000, () => {
  console.log('Start Listening...');
});
