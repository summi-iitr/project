let mysql = require('mysql')
let columns = require('./columns')
let createqueryString = (reqBody)=>{
    let columns_headers = [] 
    let values = []
    columns.forEach(column=>{
        if(reqBody[column.name]){
            columns_headers.push(column.name)
            if(column.type == "decimal"){
                values.push(`${reqBody[column.name]}`)    
            }
            else{
                values.push(`'${reqBody[column.name]}'`)
            }
            
        }
    })
    console.log(`INSERT INTO project_users(${columns_headers.join(", ")}) VALUES (${values.join(", ")})`)
    return `INSERT INTO project_users(${columns_headers.join(", ")}) VALUES (${values.join(", ")})`
}
module.exports = (reqBody, callback) =>{
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'admin',
        database: 'project'
    });
    connection.connect();
    let queryString = createqueryString(reqBody)
    connection.query(queryString, function (error, results, fields) {
        if (error){
            throw error
            callback(false)

        }
        else{
            
            callback(true)
            
        }
    })
    connection.end()
}