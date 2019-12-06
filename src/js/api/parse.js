const xlsx  = require('xlsx')
let _ = require('lodash')
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
    let readFile = xlsx.read(data.path)
    _.map(readFile.Sheets, sheet =>{
        let sheetJson = xlsx.utils.sheet_to_json(readFile.Sheets[0])
        console.log(sheetJson)
    })
   
}
