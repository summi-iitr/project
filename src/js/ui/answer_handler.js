//const query_handler = require('./process_query_handler')
//const solr_query_handler = require('./solr_query_handler')
let ui_utils = require('./utils')
let $ = global.$
const queryTypeMap = {
  Information:"DEF",
  Process:"STP"
}




let onSolrQueryResult = (res) =>{
  if(res && res.numFound >0){
    //let docs = res.docs.splice(0, 5)
    let top_docs = res.docs.splice(0, 5)
    let answerHtml = ui_utils.getListHtml(top_docs)
  
  /*function setscore(docs,q_text,q_type){
  var score=0;
  var text = ""
  $.each(docs, (index,doc) =>{
    var title = doc.title 
    //console.log("nothing recieved")
    if (typeof(title) === 'string' && typeof(q_text) === 'string' && title === q_text)
      score+=50;
    var type = doc.type
    if ( type === q_type)
      score += 50;

    let doctext = doc.text && doc.text[0]
    if(typeof(doctext) === 'string'){
      doctext = doctext.replace(/(\n)+/g, '<br />');
      text += `<li>${doctext}</li>`
      text += `${score}`
    }

  })
  return (text.length === 0 )? text: `<ol>${text}</ol>`
} */


    //let answerHtml =   setscore(docs)


    $('.predicted-answer').show()
    $('#processed_answer').html(answerHtml)
  }
}

let onQueryResult = (res) =>{
  //let q_text = $('#q_text').val()
  let query_result = JSON.parse(res)
  let query_param = {}
  //var q_type = queryTypeMap[query_result.qtype]
  let q_features = query_result.features || []
  let q_text = q_features.join(' ')
  let query_string = `q=${q_text}`
  console.log(query_result.qtype)
  if(query_result.qtype){
    //query_param.type = queryTypeMap[query_result.qtype]
    query_param.type = query_result.qtype

    query_string += `&type=${query_param.type}`

    //onSolrQueryResult(q_text,q_type)
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
