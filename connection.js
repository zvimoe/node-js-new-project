
var mysql = require('mysql');
    function dal(query,callback){
    var con = mysql.createConnection(
        {
            host : 'localhost',
            user : 'root',
            password : '',

            database : 'northwind4'
        }
    )
    con.connect(err =>{
        if(err){
            console.log('there is a error: '+err)
        }
        else{
            con.query(query,function(err,res){
                callback(err,res)
               
            
            
            })
        }
    })
}
module.exports.dal=dal