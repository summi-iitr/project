module.exports = {
  getListHtml(docs){
    let text = ""
    $.each(docs, (index, doc) =>{
      let doctext = doc.text && doc.text[0]
      if(typeof(doctext) === 'string'){
        doctext = doctext.replace(/(\n)+/g, '<br />');
        text += `<li>${doctext}</li>`
      }
    })
    return (text.length === 0 )? text: `<ol>${text}</ol>`
  }
}
