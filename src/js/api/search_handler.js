let mysql = require('mysql')

module.exports = (body, arg2, callback)=>{
    let code = body.query_type
    
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'admin',
        database: 'project'
    });
    connection.connect();
    let queryString
    if(code == 'department'){
        let arg1 = body.department 
        queryString = `SELECT * FROM project_users WHERE Dept='${arg1}'`
    }
    connection.query(queryString, function (error, results, fields) {
        if (error){
            throw error
        }
        else{
            callback(results)
            //console.log('Project_users table creted successfully');
        } 
        
    })
}