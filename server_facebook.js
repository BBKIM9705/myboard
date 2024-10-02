/// express 웹서버 설정 ///

// $npm init --> 프로젝트 초기화, package.json 파일 생성
// $npm install express --> express 서버 설치
// $npm install -g nodemon --> nodemon 설치 : 프로그램상의 변화를 감지하여 자동으로 반영


const express = require('express');
const app = express();

//비밀번호 암호화
// $npm install sha256
const sha = require('sha256');

//패스포트 인증 시스템
// $npm install passport passport-local passport-facebook
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

//facebook 패스포트
const FacebookStrategy = require("passport-facebook").Strategy;

//세션 적용
//npm install express-session
let session = require('express-session');
app.use(session({
    secret: 'dkufe8938493j4e08349u',
    resave: false,
    saveUninitialized: true
}));

//패스포트 인증
app.use(passport.initialize());
app.use(passport.session());

app.listen(8080, function () {
    console.log("포트 8080으로 서버 대기중...");
});

//정적 파일 라이브러리 설정
app.use(express.static("public")); // 정적 파일 관리를 위한 폴더 지정

/// ejs 템플리트 엔진 설정 ///
// $npm install ejs
app.set('view engine', 'ejs');


/// mongoDB 설정 ///
// $npm install --save mongodb
const mongoclient = require('mongodb').MongoClient;

// MongoDB에서 제공하는 id를 Object로 변환하기 위한 API 설정
// $npm install objectid
const ObjId = require('mongodb').ObjectId;
const url = 'mongodb+srv://bbkim:!asd970503@cluster0.uwkkz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
let mydb;
mongoclient.connect(url)
    .then(client => {
        console.log("몽고DB 접속 성공");
        mydb = client.db('myboard');
    }).catch(err => {
        console.log(err);

    });

/// POST 방식으로 Form 데이터 읽어오기 ///
// $npm install body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));


/// 라우팅 설정 ///

//홈 화면
app.get('/', function (req, res) {
    res.render('index.ejs', { user: req.session.user });
});

//로그인 화면
app.get('/login', (req, res) => {
    console.log(req.session);
    if (req.session.user) {
        console.log('세션 유지');
        res.render('index.ejs', { user: req.session.user });
    } else {
        res.render('login.ejs')
    }
});

//패스포트 인증
passport.serializeUser((user, done) => {
    console.log("serializeUser");
    done(null, user);
});

//패스포트 인증 세션유지 deserializeUser() 함수 구현
passport.deserializeUser((user, done) => {
    console.log("deserializeUser");

    mydb.collection("account").findOne({ userkey: user.userkey })
        .then(result => {
            console.log(result);
            done(null, result);
        })
});

//facebook 로그인
app.get(
    '/facebook', 
    passport.authenticate(
    'facebook'
)
);

app.get('/facebook/callback',
    passport.authenticate(
        'facebook',
        {
            successRedirect: '/',
            failureRedirect: "/fail",
        }), function (req, res) {
            console.log(req.session);
            console.log(req.session.passport);
            res.render("index.ejs", { user: req.session.passport });
        }
);

passport.use(new FacebookStrategy({
    clientID: '529084163149294',
    clientSecret: 'e5556ba76e4c83759f7280644b979821',
    callbackURL: "/facebook/callback"
},
    function (accessToken, refreshToken, profile, done) {
        console.log(profile);
        var authkey = 'facebook' + profile.id;
        var authName = profile.displayName;

        let loop = 0;
        while (loop < 2) {
            mydb.collection("account").findOne({ userkey: authkey })
                .then(result => {
                    if (result != null) {
                        done(null, result);
                    } else {
                        mydb.collection("account").insertOne({
                            userkey: authkey,
                            userid: authName,
                        })
                    }
                }).catch((error) => {
                    done(null, false, error);
                })
            loop++;
        }
    }
));

//로그인 처리
app.post('/login', passport.authenticate("local", {
    succeessRedirect: '/',
    failureRedirect: "/fail",
}), (req, res) => {
    console.log(req.session);
    console.log(req.session.passport);
    res.render("index.ejs", { user: req.session.passport });
}
);
//패스포트 인증
passport.use(
    new LocalStrategy(
        {
            usernameField: "userid",
            passwordField: "userpw",
            session: true,
            passReqToCallback: false,
        },
        function (inputid, inputpw, done) {
            mydb.collection('account').findOne({ userid: inputid })
                .then(result => {
                    if (result.userpw == sha(inputpw)) {
                        console.log("새로운 로그인");
                        done(null, result);
                    } else {
                        done(null, false, { message: "비밀번호가 틀렸습니다." });
                    }
                });
        }
    )
);

//로그아웃 처리
app.get('/logout', (req, res) => {
    console.log('로그아웃');
    req.session.destroy();
    res.render('index.ejs', { user: null });
});

//회원가입 화면
app.get("/signup", (req, res) => {
    res.render("signup.ejs")
});

//회원가입 처리
app.post("/signup", (req, res) => {
    console.log(req.body.userid);
    console.log(sha(req.body.userpw));

    mydb.collection("account").insertOne({
        userid: req.body.userid,
        userpw: sha(req.body.userpw)
    }).then(result => {
        console.log("회원 가입 되었습니다.");
    });
    res.redirect("/");
});

//게시물 목록 보기 화면
app.get('/list', (req, res) => {
    //collection('컬렉션 이름')
    mydb.collection('post').find().toArray().then(result => {
        console.log(result);//몽고DB API
        res.render('list.ejs', { data: result });
    })
    //ejs 템플릿 엔진의 경우 루트 문서 디렉토리 내에
    //반드시 views 폴더를 만들어서 그 폴더에 ***.ejs 파일을 넣어 두어야함
});

//게시물 등록 화면
app.get('/enter', (req, res) => {
    res.render('enter.ejs');
});

//게시물 등록 처리
app.post('/save', (req, res) => {
    mydb.collection('post').insertOne({
        title: req.body.title,
        content: req.body.content,
        date: req.body.date
    }).then(result => {
        console.log(result);//로그 생성
        console.log("저장되었습니다.");
        res.redirect('/list')
    })
});

//게시물 상세 보기 화면
app.get('/content/:id', (req, res) => {
    req.params.id = new ObjId(req.params.id); // 문자열 id에서 객체 형태로 변환
    //select * from post where id = *** 와 유사한형태
    mydb.collection('post').findOne({
        _id: req.params.id
    }).then(result => {
        console.log(result);
        res.render('content.ejs', { data: result });
    })
});

//게시물 삭제 처리
app.post('/delete', (req, res) => {
    req.body._id = new ObjId(req.body._id);
    //delete from post where id = ***; 와 유사한 형태
    mydb.collection('post').deleteOne(req.body)
        .then(result => {
            console.log("삭제완료");
            //상태코드 200을 응답코드로 보내줘야 ajax의 done()루틴이 작동
            res.status(200).send();
        }).catch(err => {
            console.log(err);
            res.status(500).send();
        })
});

//게시물 수정 화면
app.get('/edit/:id', (req, res) => {
    req.params.id = new ObjId(req.params.id);
    //select * from post where id = *** 형태
    mydb.collection('post').findOne({ _id: req.params.id })
        .then(result => {
            console.log(result);
            res.render('edit.ejs', { data: result });
        });
});

//게시물 수정 처리
app.post('/edit', (req, res) => {
    req.body.id = new ObjId(req.body.id);
    // update post set title = '***', content = '***', date = '***' where id='***'
    mydb.collection('post').updateOne({ _id: req.body.id }, {
        $set: {
            title: req.body.title,
            content: req.body.content,
            date: req.body.date
        }
    }).then(result => {
        res.redirect('/content/' + req.body.id)
    }).catch(err => {
        console.log(err)
    })
});

app.post("/login", passport.authenticate("local",{
    failureRedirect: "/fail",
}),
function (req, res){
    console.log(req.session);
    console.log(req.session.passport);
    res.render("index.ejs", {user : req.session.passport});
});

passport.use(
    new LocalStrategy({
        usernameField: "userid",
        passwordField: "userpw",
        session: true,
        passReqToCallback: false,
    },
function (inputid, inputpw, done){
    mydb.collection("account")
    .findOne({ userid: inputid})
    .then((result) => {
        if(result.userpw == sha(inputpw)) {
            console.log("새로운 로그인");
            done(null, result);
        } else {
            done(null, false, {message: "비밀번호 틀렸어요"});
        }
    });
})
);
/// MariaDB 연결 및 설정 ///
// $npm install --save node-mysql
/* var mysql = require('mysql');
var con = mysql.createConnection({
    host : 'localhost',
    user : 'webmaster',
    password : '[1234]',
    database : 'webdev'
});
con.connect();

con.query("select * from tbl_board", function(err, rows, field){
    if(err) throw err;
    console.log(rows);
}); */