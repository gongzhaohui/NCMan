"use strict";
const DataLoader = require('dataloader');

const Database = require('arangojs');
// const aqlQuery = Database.aqlQuery;
const db = new Database({
    url: 'http://gong:fj00admin@10.151.40.17:8529'
});
db.useDatabase("NLAA");
db.login("gong", "fj00admin");
// Using module.context.collection allows us to use the
// collection with a common prefix based on where the service
// is mounted. This way we can have multiple copies of this
// service mounted on the same database without worrying about
// name conflicts in their collections.

async function getUser(ids) {
    let query = `
       FOR u IN nc_user 
       filter ${!ids} || u._key=="${ids}"
            SORT u._key ASC
            RETURN u`
        // console.log(query);
    let response = await db.query(query);
    let result = await response.all();
    return result;
}
// async function getUserBy(ids) {
//     let query = `
//        FOR u IN nc_user 
//        filter ${!ids} || u._key=="${ids}"
//             SORT u._key ASC
//             RETURN u`
//         // console.log(query);
//     let response = await db.query(query);
//     return response.all();
// }
// const UserLoader = new DataLoader(getUserBy);

module.exports = { db, getUser };