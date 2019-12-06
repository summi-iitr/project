const xlsx  = require('xlsx')
let _ = require('lodash')
let projectAdder = require('./project_adder')
let fs = require("fs")
let addSheet = (sheet) =>{
    console.log("length =" + sheet)
    // _.each(sheet, row => {
    //     //projectAdder(element, ()=>{
    //         console.log("added row" , JSON.stringify(row))
    //     //})
    // });
}
module.exports = (data, callback)=>{
    console.log(JSON.stringify(data))
    fs.rename(data.path, data.path+".xlsx", function (err) {
        let readFile = xlsx.read(data.path+".xlsx")
        _.map(readFile.Sheets, sheet =>{
            let sheetJson = xlsx.utils.sheet_to_html(sheet)
            addSheet(sheetJson)
        })
    })
   
}
