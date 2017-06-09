let $ = global.$

let setQueryResult = (res) =>{
  let docs = JSON.parse(res)
  $.each(docs,(id, doc) =>{
    $.ajax({
      type: 'get',
      url: "solr/add",
      data:`doc=${JSON.stringify(doc)}`,
    });
  })
}
let errorFn = (error) => {
  console.error("Error");
  console.error(error);
}

module.exports= () => {

  $.ajax({
    type: 'get',
    url: "features",
    //data:`text=${q_text}`,
    success: setQueryResult,
    error:errorFn
  });
}
