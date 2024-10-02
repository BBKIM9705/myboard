var router = require('express').Router();

const mongoclient = require("mongodb").MongoClient;
const ObjId = require('mongodb').ObjectId;
// const url ='mongodb+srv://bbkim:!asd970503@cluster0.uwkkz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
const url = process.env.DB_URL;

let mydb;
mongoclient.connect(url)
            .then(client => {
                mydb = client.db('myboard');
            })
            .catch((err) =>{
                console.log(err);
            });
const sha = require('sha256');
let session = require("express-session");
router.use(
    session({
        secret: "dkufe8938493j4e08349u",
        resave: false,
        saveUninitialized: true,
    })
);

router.get("/login", function (req, res) {
    console.log(req.session);
    if (req.session.user) {
        console.log("세션 유지");
        res.render("index.ejs", {user: req.session.user});
    } else {
        console.log("로그인 페이지");
        res.render("login.ejs");
    }
})

//enter
// router.get("/enter", function (req, res) {
//     res.render("enter.ejs");
// });

router.get("/list", function (req, res){
    mydb.collection("post")
    .find()
    .toArray()
    .then((result) => {
        console.log(result);
        res.render("list.ejs", { data: result });
    });
});


module.exports = router;