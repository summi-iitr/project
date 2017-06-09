let $ = global.$

/*let setQueryResult = (res) =>{
  $('#processed_query').text(res)
  $('.predicted-answer').show()
}
*/
module.exports= () => {

  $.ajax({
    type: 'get',
    url: "features",
    //data:`text=${q_text}`,
    //success: setQueryResult
  });
}
