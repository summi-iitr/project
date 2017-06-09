var express = require('express');
let app = express();
let query_processor = require('./query')
let feature_processor = require('./process_features')
let solr_query_processor = require('./solr/query')
let solr_add_processor = require('./solr/add')

app.use(express.static('public'))

app.get('/query', function (req, res) {
  let callback =  (text) =>{
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(text));
  }
  let q_text = decodeURIComponent(req.query.text)
  query_processor(q_text, callback)
})
app.get('/features', function (req, res) {
  feature_processor()
  res.setHeader('Content-Type', 'application/json');
  res.end("done");

})
app.get('/solr/add', function (req, res) {
  let add_text = JSON.parse(decodeURIComponent(req.query.doc))
  let callback =  (text) =>{
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(text));
  }
  solr_add_processor(add_text, callback)
})
app.get('/solr/search', function (req, res) {
  let search_query = JSON.parse(decodeURIComponent(req.query.q))
  let callback =  (text) =>{
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(text));
  }
  solr_query_processor(search_query, callback)
})
var server = app.listen(8081, "10.41.42.64", function () {
  var host = server.address().address
  var port = server.address().port

  console.log("Helpbot app listening at http://%s:%s", host, port)
})
