let columns = require('./columns')
let mysql = require('mysql')
let $ = require('jquery')

module.exports = ()=>{
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'admin',
        database: 'project'
    });
    connection.connect();
    let query  = `CREATE TABLE 'project_users' (`
    let 
    $.each(columns, column =>{
        query+= `'${column.name}' ${column.sqlType},`
    })
    query.lastIndexOf(',')

}