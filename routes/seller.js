var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/mydb';
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var app = express();
app.use(session({
    secret: 'keyboardcat'
    , resave: false
    , saveUninitialized: true
    , cookie: {
        secure: true
    }
}));
/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with dddd a resource');
});
/* GET home page. */
router.get('/addproducts', function (req, res, next) {
    var items = {
        "sellerinfo": req.query.sellerinfo
        , "productsinfo": req.query.productsinfo
        , "qty": req.query.qty
        , "metrices": req.query.metrices
        , "dateofinventory": req.query.dateofinventory
        , "expiredate": req.query.expiredate
        , "activestatus": req.query.activestatus
        , "status": req.query.status
    };
    var insertDocument = function (db, callback) {
        db.collection('productlisting').insertOne(items, function (err, result) {
            assert.equal(err, null);
            res.json({
                "status": "Success"
                , 'items': items
            });
            callback();
        });
    };
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        insertDocument(db, function () {
            db.close();
        });
    });
});
/* GET home page. */
router.get('/updateproducts', function (req, res, next) {
    var items = {
        "activestatus": req.query.activestatus
        , "status": req.query.status
    };
    var ObjectId = require('mongodb').ObjectID;
    var conditions = {
        "_id": ObjectId(req.query.updateid)
    }
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        db.collection('productlisting').updateOne(conditions, {
            $set: items
            , $currentDate: {
                "lastModified": true
            }
        }, function (err, result) {
            assert.equal(err, null);
            res.json({
                "status": items
            });
        });
    });
});

/* GET home page. */
router.get('/delproducts', function (req, res, next) {
    var items = {
        "status": req.query.status
    };
    var ObjectId = require('mongodb').ObjectID;
    var conditions = {
        "_id": ObjectId(req.query.id)
    }
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        db.collection('productlisting').updateOne(conditions, {
            $set: items
            , $currentDate: {
                "lastModified": true
            }
        }, function (err, result) {
            assert.equal(err, null);
            res.json({
                "status": items
            });
        });
    });
});

//GET home page. 
router.get('/listproducts', function (req, res, next) {
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        var conditions = {
            "status": "1"
        };
        var ObjectId = require('mongodb').ObjectID;
        if (req.query.id != "") {
            var conditions = {
                "_id": ObjectId(req.query.id)
                , "status": "1"
            };
        }
        console.log(conditions);
        db.collection('productlisting').find(conditions).toArray(function (err, result) {
            assert.equal(err, null);
            console.log(result);
            res.json({
                "status": "success"
                , "result": result
                , 'cond': conditions
            });
        });
    });
});



/* GET home page. */
router.get('/profileregister', function (req, res, next) {
    var items = {
        "name": req.query.name
        , "email": req.query.email
        , "secure_question": req.query.secure_question
        , "secure_answer": req.query.secure_answer
        , "country": req.query.country
        , "state": req.query.state
        , "zip": req.query.zip
        , "doorno": req.query.doorno
        , "floor": req.query.floor
        , "addressone": req.query.addressone
        , "addresstwo": req.query.addresstwo
        , "taluk": req.query.taluk
    , };
    var conditions = {
        "mobilenum": req.query.mobilenum
    };
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        db.collection('userdata').updateOne(conditions, {
            $set: items
            , $currentDate: {
                "lastModified": true
            }
        }, function (err, result) {
            assert.equal(err, null);
            res.json({
                "status": items
            });
        });
    });
});
/* GET home page. */
router.get('/profiletworegister', function (req, res, next) {
    var items = {
        "busname": req.query.busname
        , "tin": req.query.tin
        , "licensenum": req.query.License
        , "vat": req.query.vat
        , "fax": req.query.FAX
        , "busphone": req.query.busmobile
        , "busmail": req.query.email
    };
    var conditions = {
        "mobilenum": req.query.mobilenum
    };
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        db.collection('userdata').updateOne(conditions, {
            $set: items
            , $currentDate: {
                "lastModified": true
            }
        }, function (err, result) {
            assert.equal(err, null);
            res.json({
                "status": "success"
                , "items": items
            });
        });
    });
});






module.exports = router;
