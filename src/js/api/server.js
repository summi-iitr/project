var express = require('express');
let app = express();
let mysql = require('mysql')
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
let handleSearch = require('./search_handler')
let handleAddProject = require('./project_adder')
let userChecker = (email, password) =>{
  return true
}

// let query_processor = require('./query')
// let synonymn_query_processor = require('./syn_query')

// let feature_processor = require('./process_features')
// let solr_query_processor = require('./solr/query')
// let solr_add_processor = require('./solr/add')
//const feature_adder = re
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
    password : 'admin'
  });
  connection.connect();
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
  handleAddProject(req,res)
})

app.post('/login', function (req, res) {
  if(userChecker(req.body.email, req.body.password)){
    req.session.user=req.body.email
    res.redirect('/home.html');
  }
  else{
    res.redirect('/login.html');
  }
  //   // let add_text= JSON.parse(req.body)
  //   // let callback =  (text) =>{
  //   //   res.setHeader('Content-Type', 'application/json');
  //   //   res.end(JSON.stringify(text));
  //   // }

  console.log(JSON.stringify(req.body))
  //   // solr_add_processor(add_text, callback)
  // })
})
// app.get('/query', function (req, res) {
//   // let callback =  (text) =>{
//   //   console.log(text)
//   //   res.setHeader('Content-Type', 'application/json');
//   //   res.end(JSON.stringify(text));
//   // }
//   // let q_text = decodeURIComponent(req.query.q)
//   // console.log(q_text)
//   // query_processor(q_text, callback)
// })

// app.get('/features', function (req, res) {
//   // let callback =  (text) =>{
//   //   //console.log(text)
//   //   res.setHeader('Content-Type', 'application/json');
//   //   res.end(JSON.stringify(text));
//   // }
//   // feature_processor(callback)
// })
// app.post('/solr/add', function (req, res) {
//   // let add_text= JSON.parse(req.body)
//   // let callback =  (text) =>{
//   //   res.setHeader('Content-Type', 'application/json');
//   //   res.end(JSON.stringify(text));
//   // }
//   // solr_add_processor(add_text, callback)
// })
// app.get('/solr/search', function (req, res) {
//   // let callback =  (text) =>{
//   //   res.setHeader('Content-Type', 'application/json');
//   //   res.end(JSON.stringify(text));
//   // }
//   // try{
//   //   let search_query = decodeURIComponent(req.query.q)
//   //   let search_type = decodeURIComponent(req.query.type)

//   //   solr_query_processor(search_query, search_type, callback)
//   // }
//   // catch(e){
//   //   callback(e)
//   // }
// })
var server = app.listen(8081, "127.0.0.1", function () {
  var host = server.address().address
  var port = server.address().port

  console.log("Helpbot app listening at http://%s:%s", host, port)
})
