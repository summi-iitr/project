var express = require('express');
let app = express();
let query_processor = require('./query')
app.use(express.static('public'))

app.get('/query', function (req, res) {
  let callback =  (text) =>{
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(text));
  }
  let q_text = decodeURIComponent(req.query.text)
  query_processor(q_text, callback)
})


var server = app.listen(8081, "10.41.42.64", function () {
  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)
})
