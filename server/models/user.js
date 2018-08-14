// var config = require('../config/arangodb')[process.env.NODE_ENV]
let Database = require('arangojs');
let db = new Database({
    url: 'http://gong:fj00admin@localhost:8529'
});
db.useDatabase("NLAA");
db.login("gong", "fj00admin")
module.exports = {
    getAllUsers: function() {
        // console.log("getAllUsers")
        return db.query('FOR x IN nc_user RETURN x')
            .then(
                function(cursor) {
                    // console.log("cursor:" + cursor)
                    return cursor.all();
                },
                function(err) {
                    console.log(err);
                });
    },
    getUserByKey: function(userKey) {
        let bindVars = {
            'userKey': userKey
        };
        console.log("getUserByKey:" + userKey)
        return db.query(`FOR x IN nc_user FILTER x._key == @userKey RETURN x`, bindVars)
            .then(
                function(cursor) {
                    return cursor.all();
                },
                function(err) {
                    console.log(err);
                });
    },
    addUser: function(user) {
        return db.collection('nc_user').save(user);
    },
    updateUser: function(user) {
        let bindVars = {
            'key': user.key,
            'username': user.username,
            "email": user.email
        };
        return db.query('FOR x IN nc_user FILTER x._key == @key UPDATE x WITH { username:@username, email:@email } IN nc_user', bindVars)
            .then(function(cursor) {
                return cursor.all();
            });
    },
    removeUser: function(userKey) {
        let bindVars = {
            'userKey': userKey
        };
        return db.query('FOR x IN nc_user FILTER x._key == @userKey REMOVE x IN nc_user LET removed = OLD RETURN removed', bindVars)
            .then(function(cursor) {
                return cursor.all();
            });
    }
}
