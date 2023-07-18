const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const nunjucks = require('nunjucks');
const dotenv = require('dotenv');
const passport = require('passport')

dotenv.config();

const pageRouter = require('./routes/page');
const authRouter = require('./routes/auth')
const postRouter = require('./routes/post')
const userRouter = require('./routes/user')
const { sequelize } = require('./models')
const passportConfig = require('./passport')

const app = express();
passportConfig(); // 패스포트 설정
/** nunjucks 설정방법  */
app.set('port', process.env.PORT || 8001);
app.set('view engine', 'html');
nunjucks.configure('views', {
  express: app,
  watch: true,
});

sequelize.sync({force: false}) // 씨퀄라이즈 모델 수정하면 DB수정은 따로 해줄 것 
  .then(()=>{
    console.log("데이터베이스 연결 성공")
  })
  .catch((err)=>{
    console.error(err)
  })


app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
// 요청 주소로는 img가 들어오지만 실제로는 uploads이하의 이미지 파일을 가져감
app.use('/img',express.static(path.join(__dirname, 'uploads')));  
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
/** 라우터 가기 전에 미들웨어로 passport 적용 */
app.use(passport.initialize())
app.use(passport.session()) //   passport.deserializeUser 실행


// 페이지 라우터 연결
app.use('/', pageRouter);
app.use('/post', postRouter)
app.use('/auth', authRouter); // post : /auth/..
app.use('/user', userRouter)
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
