const express = require('express'); //express import하기
const expressLayouts = require('express-ejs-layouts'); //ejs 틀 기능? import
const session = require('express-session'); // session 임포트(로그인관련)
const CookieParser = require('cookie-parser'); // cookie-parser 임포트(로그인관련)
const routes = require('./routes'); // 페이지 큰 맥락에 따라 분리하기 위해서 만든 라우트 변수
const app = express(); //app 변수에 express 프레임워크  지정
const port = 3000; // 서버 포트 3000

const Authenticate = require('./middlewares/Authentication'); //로그인 유지 기능 미드웨어
const OnlyAuthenticated = require('./middlewares/OnlyAuthenticated');// 사용자만이 사용 가능게 만들기 위한 미드웨어
const OnlyAnonymous = require('./middlewares/OnlyAnonymous'); //사용자가 아닌경우를 골라내기 위한 미드웨어


const connect = require('./schema'); //데이터베이스에 저장할 데이터틀을 사용하기 위해 schema폴더에 연결
const Board = require('./schema/Board'); //Board라는 스키마사용 가능 
connect();

//데이터 가공용도로 쓰이는 두가지 미드웨어인데 req.body를 사용 가능하게 만듬
app.use(express.urlencoded({ extended: false })); 
app.use(express.json());
//template engine을 쓰기 위해서 ejs파일 위치를 서버와 연결해줌
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
//??
app.set('layout', 'layout');
app.set('layout extractScripts', true);
app.use(expressLayouts);
//??
app.use(CookieParser('keyboard cat'))
app.set('trust proxy', 1);
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))
//로그인 유지 허가?
app.use(Authenticate);
//슬래시api로 시작하는 url 라우터로 ㄱㄱ
app.use('/api', routes)

// 게시판 호출
app.get('/', (req, res) => {
    res.render('./board/list', { user: req.user });//?
});

// 게시판 쓰기
app.get('/boards/new', OnlyAuthenticated, (req, res) => {
    res.render('./board/editor', { editor: true, user: req.user });//?
});

// 게시판 읽기
app.get('/boards/:boardId', async (req, res) => {//url 주소 마지막에 콜론찍은건 무슨 의미 였더라?
    let boardId = req.params.boardId;
    const board = await Board.findById(boardId).populate('writer');
    res.render('./board/detail', { boardId, board, user: req.user });
});

// 회원가입
app.get('/sign-up', OnlyAnonymous, (req, res) => {
    res.render('./auth/sign-up', { isAuthPath: true });
});

// 로그인
app.get('/sign-in', OnlyAnonymous, (req, res) => {
    res.render('./auth/sign-in', { isAuthPath: true });
})

// 게시판 수정
app.get('/boards/:boardId/edit', OnlyAuthenticated, async (req, res) => {
    let boardId = req.params.boardId;
    const board = await Board.findById(boardId).populate('writer');
    res.render('./board/editor', { boardId, board, user: req.user });
});

module.exports = app;
