let solr = require('solr')
let client = solr.createClient({core:"/gettingstarted"});

module.exports = (query_text, type, callback) =>{
  let query
  if(type !== 'undefined'){
    query = `title:(${query_text})^4 OR subject:${query_text}`
  }
  else{
    query = `text:${query_text}`
  }
  client.query(query, {fq:`type=${type}`}, function(err, response) {
    if (err){
      console.error(err);
      callback([])
    }
    else{
      var responseObj = JSON.parse(response);
      console.info(`A search for "${query}" returned ${response}`)
      if(callback)
        callback(responseObj.response)
    /*  client.del(null, query, function(err) {
      if (err) throw err;
      console.log('Deleted all docs matching query "' + query + '"');
      client.commit()
      client.commit()

    });
    */
    }
  });
}
