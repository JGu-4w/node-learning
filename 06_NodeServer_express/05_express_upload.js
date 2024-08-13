const express = require('express');
const multer = require('multer');

const app = express();

const upload = multer({
  // dest: './uploads',
  storage: multer.diskStorage({
    destination(req, file, callback) {
      callback(null, './uploads');
    },
    filename(req, file, callback) {
      callback(null, `${Date.now()}_${file.originalname}`);
    },
  }),
});

// 单文件上传
app.post('/upload', upload.single('avatar'), (req, res, next) => {
  console.log(req.file);
  res.end('success');
});

// 多文件上传
app.post('/photos', upload.array('photos'), (req, res, next) => {
  console.log(req.files);
  res.end('sucess');
});

app.listen(8000, () => {
  console.log('Start Listening...');
});
