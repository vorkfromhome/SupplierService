var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/mydb';

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with dddd a resource');
});


//catagory...

/* GET home page. */
router.get('/createcategory', function (req, res, next) {
    var items = {
        "categoryname": req.query.categoryname
        , "status": req.query.status
    };
    var insertDocument = function (db, callback) {
        db.collection('category').insertOne(items, function (err, result) {
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


//GET home page. 
router.get('/listcategory', function (req, res, next) {
    
    var conditions = {
            "status": "1"
        };
    if(req.query.id!=''){
        var ObjectId = require('mongodb').ObjectID;
         conditions = {
            "_id": ObjectId(req.query.id)
             ,"status": "1"
        }
    }
    
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        db.collection('category').find(conditions).toArray(function (err, result) {
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
router.get('/updatecategory', function (req, res, next) {
    var items = {
        "categoryname": req.query.categoryname
    };
    var ObjectId = require('mongodb').ObjectID;
        var conditions = {
            "_id": ObjectId(req.query.updateid)
        }
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        db.collection('category').updateOne(conditions, {
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


//product...

/* GET home page. */
router.get('/createproducts', function (req, res, next) {
    var items = {
        "category": req.query.category
        , "producttype": req.query.producttype
        , "productname": req.query.productname
        , "quantity" : req.query.quantity
        , "metrics" : req.query.metrics
        , "price" : req.query.price
        , "store" : req.query.store
        , "supplier" : req.query.supplier
        , "dateininventory" : req.query.dateininventory
        , "expiry" :req.query.expiry
        , "activestatus" : req.query.activestatus
        , "status" : req.query.status
    };
    var insertDocument = function (db, callback) {
        db.collection('productdetails').insertOne(items, function (err, result) {
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

//GET home page. 
router.get('/listproducts', function (req, res, next) {
    var conditions = { "status": "1" };
    if(req.query.id!=''){
        var ObjectId = require('mongodb').ObjectID;
         conditions = {
            "_id": ObjectId(req.query.id)
             ,"status": "1"
        }
    }
    console.log(conditions);
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        db.collection('productdetails').find(conditions).toArray(function (err, result) {
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
router.get('/updateproducts', function (req, res, next) {
    var items = {
        "category": req.query.category
        , "producttype": req.query.producttype
        , "productname": req.query.productname
        , "quantity" : req.query.quantity
        , "metrics" : req.query.metrics
        , "price" : req.query.price
        , "store" : req.query.store
        , "supplier" : req.query.supplier
        , "dateininventory" : req.query.dateininventory
        , "expiry" :req.query.expiry
        , "activestatus" : req.query.activestatus
    };
    var ObjectId = require('mongodb').ObjectID;
        var conditions = {
            "_id": ObjectId(req.query.updateid)
        }
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        db.collection('productdetails').updateOne(conditions, {
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
module.exports = router;
