'use strict';

const gql = require('graphql');
const query = require('./query');

module.exports = new gql.GraphQLSchema({
    query: query.queryType,
    mutation: query.mutationType
});