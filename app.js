// CRUD Application
//-----------------
var app = require('express')(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    port = 3000,
    Member = require('./Member.model');
///var autoIncrement = require("mongodb-autoincrement");

var db = 'mongodb://127.0.0.1/north';
mongoose.connect(db, {
    useMongoClient: true
});
var con = mongoose.connection;

con.on('error', console.error.bind(console, 'connection error:'));

con.once('open', function () {
    console.log("connection created");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

//Routes
app.get('/', function (req, res) {
    res.send('Happy to see u');
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
app.post('/member', function (req, res) {
    var newMember = new Member();
    // MongoClient.connect(url, function (err, db) {
    //     autoIncrement.getNextSequence(db, 'members', function (err, autoIndex) {

    //         newMember._id = autoIndex;

    //     });
    // });
    newMember.title = req.body.name;
    newMember.author = req.body.age;

    newMember.save(function (err, member) {
        if (err) {
            res.send('Error saving member!')
        } else {
            console.log(member);
            res.json(member);
        }
    })
});

app.put('/member/:id', function (req, res) {
    Member.findOneAndUpdate({
            _id: req.params.id // [query]
        }, {
            $set: {
                title: req.body.name // [doc]
            }
        }, {
            upsert: true // [options] if this document has no title create one
        },
        function (err, newMember) {
            if (err) {
                console.log('error occured');
            } else {
                console.log(newMember);
                res.status(204).send(newMember);
            }
        });
});

app.delete('/member/:id', function (req, res) {
    Member.findOneAndRemove({
        _id: req.params.id
    }, function (err, member) {
        if (err) {
            res.send('error deleting')
        } else {
            console.log(member);
            res.status(204).send(member);
        }
    });
});

app.listen(port, function () {
    console.log(`App listening on port ${port}`);
})