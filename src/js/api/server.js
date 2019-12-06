var express = require('express');
let app = express();
let mysql = require('mysql')
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');

let handleSearch = require('./search_handler')
let handleNumSearch = require('./num_search_handler')
let allUserInfoHandler = require('./users_handler')

let handleAddUser = require('./add_user')
let handleAddProject = require('./project_adder')
let userChecker = require('./check_user')
let excelHandler = require('./parse')
const formidable = require('formidable')

app.use(express.static('public'))
// initialize cookie-parser to allow us access the cookies stored in the browser. 
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
// initialize express-session to allow us track the logged-in user across sessions.
app.use(session({
    key: 'user_sid',
    secret: 'thisisasecret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));


// middleware function to check for logged-in users
var sessionChecker = (req, res, next) => {
  if (req.session.user && req.cookies.user_sid) {
      res.redirect('/home.html');
  } else {
      next();
  }    
};
app.post('/upload/excel', function (req, res) {
  new formidable.IncomingForm().parse(req)
    .on('file', (name, file) => {
      excelHandler(file,()=>{
    
      })
 //     console.log('Uploaded file', name, file)
    })
    
    .on('end', () => {
      res.end()
    })
  
})

app.get('/allusers', (req, res) => {
  
  allUserInfoHandler( (result) =>{  
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result));
  })
})

app.get('/numberquery', (req, res) => {
  console.log("q ="+ req.query.q)
handleNumSearch(req.query.q, (result) =>{  
    
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result));
  })
})
// route for Home-Page
app.get('/', sessionChecker, (req, res) => {
  res.redirect('/login.html');
});

app.post('/search', function (req, res) {
  handleSearch(req.body,res, (result)=>{
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result));
  })
})

app.post('/addproject', function (req, res) {
  console.log("I am in post")
  handleAddProject(req.body, (retVal)=>{
    console.log("completed add")
    res.redirect('/home.html');
  })
})

app.post('/adduser', function (req, res) {
  console.log("I am in post")
  handleAddUser(req.body, (retVal)=>{
    res.redirect('/home.html');
  })
})

app.get('/userinfo', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ user: req.session.user, admin: req.session.admin}));
})

app.post('/login', function (req, res) {
  userChecker(req.body.email, req.body.password, (retVal, admin)=>{
    if(retVal){
      req.session.user=req.body.email
      req.session.admin = admin?true:false
      res.redirect('/home.html');
    }
    else{
      res.redirect('/login.html');
    }
  })
})

var server = app.listen(8081, "127.0.0.1", function () {
  var host = server.address().address
  var port = server.address().port

  console.log("Project app listening at http://%s:%s", host, port)
})
