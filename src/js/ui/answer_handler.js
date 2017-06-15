//const query_handler = require('./process_query_handler')
//const solr_query_handler = require('./solr_query_handler')
let $ = global.$
const queryTypeMap = {
  Information:"shortdesc",
  Process:"taskbody"
}

let onSolrQueryResult = (res) =>{
  if(res && res.numFound >0){
    $('.predicted-answer').show()
    let text = res.docs[0].text[0]
    text = text.replace(/(\n)+/g, '<br />');
    $('#processed_answer').html(text)
  }
}

let onQueryResult = (res) =>{
  //let q_text = $('#q_text').val()
  let query_result = JSON.parse(res)
  let query_param = {}
  let q_features = query_result.features || []
  let q_text = q_features.join(' ')
  let query_string = `q=${JSON.stringify(q_text)}`
  if(query_result.qtype){
    query_param.type = queryTypeMap[query_result.qtype]
    query_string += `&type=${query_param.type}`
  }

  $.ajax({
    type: 'get',
    url: "solr/search",
    data: query_string,
    success: onSolrQueryResult
  });

}

module.exports= () =>{
  let q_text = $('#q_text').val()
  $.ajax({
    type: 'get',
    url: "query",
    data:`q=${q_text}`,
    success: onQueryResult
  });
}
