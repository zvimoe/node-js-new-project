
var express =require('express')
var dal = require('./connection.js')
var app = express();
app.get('/shippers',function(req,res){
    dal.dal('select*from shippers',function(err,shippers){
        if(err){
            res.end(err)
        }
        res.end(JSON.stringify(shippers))
    })
})
app.get('/suppliers',function(req,res){
       
    dal.dal('select*from suppliers',function(err,shippers){
        if(err){
            res.end(err)
        }
        res.end(JSON.stringify(shippers))
    })
})
app.get('/products',function(req,res){
    dal.dal('select*from products',function(err,shippers){
        if(err){
            res.end(err)
        }
        res.end(JSON.stringify(shippers))
    })

})
app.post('/',function(req,res){


})


app.listen(1300)