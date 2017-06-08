let $ = global.$

let setQueryResult = (res) =>{
  $('#solr_result').text(res)
  $('.solr-result').show()
}

module.exports= () => {
  let q_text = $('#demo_solr_q_text').val()
  $.ajax({
    type: 'get',
    url: "solr/search",
    data:`q=${q_text}`,
    success: setQueryResult
  });
}
