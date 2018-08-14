'use strict'

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
    let query = aql `
       FOR episode IN OUTBOUND ${ids} appearsIn
            SORT episode._key ASC
            RETURN episode
          `
    let response = await db.query(query)
    return response.all()
}
module.exports = { db, nc_user_col, getFriendsByIDs, getAppearinsByIDs }