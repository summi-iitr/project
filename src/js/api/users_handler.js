let mysql = require('mysql')
module.exports = (callback) =>{
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'admin',
        database: 'project'
    });
    connection.connect();
    connection.query(`SELECT * FROM users`, function (error, results, fields) {
        if (error){
            
            callback(false)
        }
        else{
            callback(results)
            
        } 
        console.log('The solution is: ', JSON.stringify(results));
    })
    connection.end();
}