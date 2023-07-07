const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const nunjucks = require('nunjucks');
const dotenv = require('dotenv');

dotenv.config();
const pageRouter = require('./routes/page');

const app = express();

/** nunjucks 설정방법  */
app.set('port', process.env.PORT || 8001);
app.set('view engine', 'html');
nunjucks.configure('views', {
  express: app,
  watch: true,
});

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
}));

// 페이지 라우터 연결
app.use('/', pageRouter);
// 모든 라우터 뒤에 나오는 404 처리 미들웨어 
app.use((req, res, next) => {
  const error =  new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error); // next 안에 error 넣으면 바로 에러 미들웨어로 넘어감 
});

/** 에러 미들웨어 (인자가 반드시 err,req,res,next 모두 들어가 있어야 함 ) */
app.use((err, req, res, next) => {
  res.locals.message = err.message; // 템플릿 엔진의 message 
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {}; // 개발 모드 일때는 Message Stack 보이게, 배포모드일때는 안보이게
  res.status(err.status || 500);
  res.render('error');
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기중');
});
