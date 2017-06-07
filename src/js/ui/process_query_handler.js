let $ = global.$

let setQueryResult = (res) =>{
  $('#processed_query').text(res)
  $('.predicted-answer').show()
}

module.exports= () => {
  let q_text = $('#demo_q_text').val()
  $.ajax({
    type: 'get',
    url: "query",
    data:`text=${q_text}`,
    success: setQueryResult
  });
}
