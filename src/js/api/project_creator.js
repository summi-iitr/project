let columns = require('./columns')
let mysql = require('mysql')
let $ = require('jquery')

let fn = ()=>{
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'admin',
        database: 'project'
    });
    connection.connect();
    let columnString = []
    columns.forEach((column) =>{
        columnString.push(`${column.name} ${column.sqlType}`)
    })
    let query = `CREATE TABLE project_users (${columnString.join(',')}, PRIMARY KEY (code)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='This table stores the project users in the system';`
    connection.query(query, function (error, results, fields) {
        if (error){
            throw error
            
        }
        else{    
            console.log('Project_users table creted successfully');
        } 
        
    })
    connection.end()
}
fn()