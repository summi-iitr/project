const xlsx  = require('xlsx')
let $ = require('jquery')
let addSheet = (sheet) =>{

}
module.exports = (data, callback)=>{
    let readFile = xlsx.read(data)
    $.each(readFile.Sheets, (idx, sheet) =>{
        let sheetJson = xlsx.utils.sheet_to_json(sheet)
        addSheet(sheetJson)
    })
}
