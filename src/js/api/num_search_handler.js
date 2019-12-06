let mysql = require('mysql')

module.exports = (query, callback)=>{
    
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'admin',
        database: 'project'
    });
    connection.connect();
    console.log(query)
    connection.query(query, function (error, results, fields) {
        if (error){
            throw error
        }
        else{
            callback(results)
            //console.log('Project_users table creted successfully');
        } 
        
    })
    connection.end()
}