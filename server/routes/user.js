var express = require('express');
var router = express.Router();
//var mongoose = require('mongoose');
//var Book = require('../models/Book.js');
var User = require('../models/user');

/* GET ALL BOOKS */
router.get('/', function(req, res, next) {
    console.log("↓↓↓↓ Getting User lists ↓↓↓↓");
    User.getAllUsers().then(
        function(list) {
            console.log(list);
            res.json(list);
        },
        function(err) {
            console.error('Something went wrong:', err);
            res.send("There was a problem adding the information to the database. " + err);

        }
    )
});

/* GET SINGLE BOOK BY ID */
router.get('/:id', function(req, res, next) {
    User.getUserByKey(req.params.id).then(
        function(list) {
            console.log(list);
            res.json(list);
        },
        function(err) {
            console.error('Something went wrong:', err);
            res.send("There was a problem adding the information to the database. " + err);

        }
    );
});

/* SAVE BOOK */
router.post('/', function(req, res, next) {
    User.addUser(req.body).then(
        function(list) {
            console.log(list);
            res.json(list);
        },
        function(err) {
            console.error('Something went wrong:', err);
            res.send("There was a problem adding the information to the database. " + err);

        }
    );
});

/* UPDATE BOOK */
router.put('/:id', function(req, res, next) {
    User.updateUser(req.params.id, req.body).then(
        function(list) {
            console.log(list);
            res.json(list);
        },
        function(err) {
            console.error('Something went wrong:', err);
            res.send("There was a problem adding the information to the database. " + err);

        });
});

/* DELETE BOOK */
router.delete('/:id', function(req, res, next) {
    user.removeUser(req.params.id, req.body).then(
        function(list) {
            console.log(list);
            res.json(list);
        },
        function(err) {
            console.error('Something went wrong:', err);
            res.send("There was a problem adding the information to the database. " + err);

        });
});

module.exports = router;