let mysql = require('mysql')
module.exports = (email, password, callback) =>{
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'admin',
        database: 'project'
    });
    connection.connect();
    connection.query(`SELECT * FROM users WHERE email='${email}'`, function (error, results, fields) {
        if (error){
            
            callback(false)
        }
        else{
            if(results.length === 1 && results[0].password === password){
                callback(true, results[0].admin)
            }
            else{
                callback(false)
            }
        } 
        console.log('The solution is: ', JSON.stringify(results));
    })
    connection.end();
}