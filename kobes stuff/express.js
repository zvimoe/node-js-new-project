var express = require('express');
var dal = require('./sql.js');

var app = express();


app.get('/', function (req, res) {
   console.log('/');
   res.end('/');
});

app.get('/products', function (req, res) {
    dal.getCars(function(err, products) {
        if (err) {
            res.end('Sorry Dude!');
        }
        res.end(JSON.stringify(products));
    })
});

 app.post('/manufacturers', function (req, res) {
    console.log('/manufacturers');
    res.end('manufacturers');
 })


var server = app.listen(8081, function () {

})
