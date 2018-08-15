'use strict'
// const DataLoader = require('dataloader');
const Database = require('arangojs');
// const aqlQuery = Database.aqlQuery;
const db = new Database({
    url: 'http://gong:fj00admin@10.151.40.17:8529'
});
db.useDatabase("NLAA");
db.login("gong", "fj00admin")
    // Using module.context.collection allows us to use the
    // collection with a common prefix based on where the service
    // is mounted. This way we can have multiple copies of this
    // service mounted on the same database without worrying about
    // name conflicts in their collections.
const nc_user_col = db.collection('nc_user');

async function getFriendsByIDs(ids, species) {
    let query = aql `
    FOR friend IN ANY ${ids} friends
    FILTER !${species} || friend.$type == ${species}
    SORT friend._key ASC
    RETURN friend
  `
    let response = await db.query(query)
    return response.all()
}

async function getAppearinsByIDs(ids) {
    let query = `
       FOR episode IN OUTBOUND ${ids} appearsIn
            SORT episode._key ASC
            RETURN episode
          `
    let response = await db.query(query)
    return response.all()
}
async function getUser(id) {
    let query = `
       FOR u IN nc_user 
       filter ${!id} || u._key=="${id}"
            SORT u._key ASC
            RETURN u`
        // console.log(query);
    let response = await db.query(query);
    // console.log("-------------response------------" + JSON.stringify(response));
    let result = await response.all();
    // console.log("------result------" + JSON.stringify(result));
    return result;
}

module.exports = { db, nc_user_col, getFriendsByIDs, getAppearinsByIDs, getUser }