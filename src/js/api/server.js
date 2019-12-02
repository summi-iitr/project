var express = require('express');
let app = express();
let mysql = require('mysql')
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
let handleSearch = require('./search_handler')
let handleAddUser = require('./add_user')
let handleAddProject = require('./project_adder')
let userChecker = require('./check_user')

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

app.get('/synquery', function (req, res) {
  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'admin',
    database: 'project'
  });
  connection.connect();
  connection.query('SELECT * FROM users', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', JSON.stringify(results));
  });
  console.log("done")
  let callback =  (text) =>{
    console.log(text)
    res.setHeader('Content-Type', 'text/html');
    res.end(text);
  }

  let q_text = decodeURIComponent(req.query.q)
  console.log(q_text)
  callback("test")
  // synonymn_query_processor(q_text, callback)
})


// middleware function to check for logged-in users
var sessionChecker = (req, res, next) => {
  if (req.session.user && req.cookies.user_sid) {
      res.redirect('/home.html');
  } else {
      next();
  }    
};


// route for Home-Page
app.get('/', sessionChecker, (req, res) => {
  res.redirect('/login.html');
});

app.post('/search', function (req, res) {
  handleSearch(req,res)
})

app.post('/addproject', function (req, res) {
  console.log("I am in post")
  handleAddProject(req.body, (retVal)=>{
    res.redirect('/home.html');
  })
})

app.post('/adduser', function (req, res) {
  console.log("I am in post")
  handleAddUser(req.body, (retVal)=>{
    res.redirect('/home.html');
  })
})

app.post('/login', function (req, res) {
  userChecker(req.body.email, req.body.password, (retVal, admin)=>{
    if(retVal){
      req.session.user=req.body.email
      req.session.admin = admin
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
