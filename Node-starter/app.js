// CRUD Application
//-----------------
var app = require('express')(),
    express = require('express'),
    mongoose = require('mongoose'),
    path = require('path'),
    bodyParser = require('body-parser'),
    port = 3000,
    session = require('express-session')
// include models here
const Member = require('./Member.model');
    

// db configuration
var db = 'mongodb://127.0.0.1/north';
mongoose.connect(db , { useMongoClient: true });
var con = mongoose.connection;

app.use('/client', express.static(path.join(__dirname, 'client')))

app.use(session({
    secret: 'somesecret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))

app.use(function(req, res, next) {
    const adminRoutes = ['/admin'];
    const allowedRoutes = ['/login', '/'];

    console.log(req.session.auth);
    if (allowedRoutes.indexOf(req.originalUrl) > -1) {
        next();
    }
    else if (req.session.auth == null) {
        res.send(401);
    }
    else if (req.session.auth.role == 'user') {
        if (adminRoutes.indexOf(req.originalUrl) > -1) {
            res.send(401, 'only admins');
        }
    }
    else {
        next();
    }
});

app.use(bodyParser.json());       
app.use(bodyParser.urlencoded({extended:false})); 

con.on('error', console.error.bind(console, 'connection error:'));

con.once('open', function () {
    console.log("connection created");
});


//Routes
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/index.html'));
});

app.post('/login', function (req, res) {
    req.session.auth = {
        name: 'user'
    }

    console.log(req.session.auth);
    res.send('please login');
});

app.get('/members', function (req, res) {
    console.log('getting all members');
    Member.find({})
        .exec(function (err, Member) {
            if (err) {
                res.send(404, 'Error has occurred!')
            } else {
                console.log(Member);
                res.json(Member);
            }
        });
});

// get one Member
app.get('/members/:id', function (req, res) {
    console.log('getting on Member');
    Member.findOne({
        _id: req.params.id // body-parser did it !!!!
    }).exec(function (err, Member) {
        if (err) {
            res.send(404, 'Error Occurred!')
        } else {
            console.log(Member);
            res.json(Member);
        }
    });
});

// Create document I 
app.post('/member' , function(req,res) {
    var newMember = new Member();
    newMember.title =    req.body.name;
    newMember.author =   req.body.age;

    newMember.save(function(err,member) {
        if (err) {
            res.send('Error saving member!')
        } else {
            console.log(member);
            res.json(member);
        }
    })
});

app.put('/member/:id', function(req,res) {
   Member.findOneAndUpdate(
       {
           _id: req.params.id // [query]
       },
       {
           $set: {
               title: req.body.name // [doc]
           }
        },
        {
            insert: true      // [options] if this document has no title create one
        },
        function(err,newMember) {
            if (err) { console.log('error occured');
            } else {
                console.log(newMember);
                res.status(204).send(newMember);
            } 
        });
});

app.delete('/member/:id' , function(req,res) {
    Member.findOneAndRemove(
         {
            _id: req.params.id
        }, function(err, member) {
            if (err) {
                res.send('error deleting')
            }else {
                console.log(member);
                res.status(204).send(member);
            }
        });
});

app.listen(port, function () {
    console.log(`App listening on port ${port}`);
})