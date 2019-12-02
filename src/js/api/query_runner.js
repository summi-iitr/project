
module.exports = (code, arg1, arg2)=>{
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'admin',
        database: 'project'
    });
    connection.connect();
    let queryString
    if(code == 1){ 
        queryString = `SELECT * FROM users WHERE Dept='${arg1}'`
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