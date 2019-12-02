const xlsx  = require('xlsx')
let $ = require('jquery')
let projectAdder = require('./project_adder')
let addSheet = (sheet) =>{
    sheet.array.forEach(element => {
        projectAdder(element, ()=>{
            console.log("added row" , JSON.stringify(element))
        })
    });
}
module.exports = (data, callback)=>{
    console.log(JSON.stringify(data))
    // let readFile = xlsx.read(data)
    // $.each(readFile.Sheets, (idx, sheet) =>{
    //     let sheetJson = xlsx.utils.sheet_to_json(sheet)
    //     addSheet(sheetJson)
    // })
}
