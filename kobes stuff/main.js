const mysql = require('mysql');
var express = require('express');
var app = express();

app.get('/', function (req, res) {
    // 1.create connection
    const con = mysql.createConnection(
        // connection details
        {
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'northwind'
        }
    );
    // 2.cconnect
    con.connect(
        err => {
            if (err) {
                console.log('Error connecting to DB:' + err);
                return;
            }
            console.log('Connected');
        }
    );

    // 3. crud : insert
    // use backtick `` for free text
    con.query(
        `select * from products`,
        // this is fat arrow function
        (err, rows) => {
            if (err) throw err;
            // console.log(JSON.stringify(rows,null,4));
            rows.forEach(
                row => {
                    console.log(row.model);
                });
        }
    );

    con.end();
    res.end(JSON.stringify({
        a: 1
    }));
});

var server = app.listen(8081, function () {



})