const express = require('express');
const morgan = require('morgan'); // 클라이언트 서버 통신하면 정보를 알려줌 
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();
const app = express();
app.set('port', process.env.PORT || 3000);

app.use(morgan('dev')); // app.use(moragan('combined')) 는 네트워킹시 서버 로그로 더 상세한 설명 표시 ex) GET / 200 5.909ms
app.use('/', express.static(path.join(__dirname, 'public')));
/** req.body.name를 쓸 수 있도록 통신 데이터를 객체롤 잘 만들어줌  */
app.use(express.json()); // 클라이언트에서 json을 보냈을 때 json parsing
app.use(express.urlencoded({ extended: false })); // 클라이언트에서 form submit 했을 때 form parsing, extendeds는 true면 qs, false 면 querystring -> true추천

// 쿠키 문자열을 객체로 
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
  name: 'session-cookie',
}));

const multer = require('multer');
const fs = require('fs');

try {
  fs.readdirSync('uploads');
} catch (error) {
  console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
  fs.mkdirSync('uploads');
}
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'uploads/');
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      done(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});
app.get('/upload', (req, res) => {
  res.sendFile(path.join(__dirname, 'multipart.html'));
});
app.post('/upload', upload.single('image'), (req, res) => {
  console.log(req.file);
  res.send('ok');
});

app.get('/', (req, res, next) => {
  console.log('GET / 요청에서만 실행됩니다.');

  req.cookies // { mucookie: 'test'}
  res.cookie('name', encodeURIComponent(name), {
    express: new Date(),
    httpOnly: true,
    path: '/'
  })

  res.clearCookie('name', encodeURIComponent(name),{
    httpOnly: true,
    path: '/',
  })

  next();
}, (req, res) => {
  throw new Error('에러는 에러 처리 미들웨어로 갑니다.')
});
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err.message);
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});
