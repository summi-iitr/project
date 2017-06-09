let solr = require('solr')
let client = solr.createClient({core:"/techproducts"});

module.exports = (query_text, callback) =>{
  var query = `text_t:${query_text}`
  client.query(query, function(err, response) {
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
