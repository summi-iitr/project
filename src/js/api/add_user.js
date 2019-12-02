let mysql = require('mysql')
module.exports = (user, callback) =>{
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'admin',
        database: 'project'
    });
    connection.connect();
    
    connection.query(`INSERT INTO users(name, email, password, sex, admin) VALUES ('${user.name}', '${user.email}','${user.password}', '${user.sex}', ${user.admin =='true'?1:0})`, function (error, results, fields) {
        if (error){
            throw error
            callback(false)

        }
        else{
            
            callback(true)
            
        } 
        console.log('The solution is: ', JSON.stringify(results));
    })
    connection.end();
}