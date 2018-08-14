'use strict';

const gql = require('graphql');
const query = require('./query');

const schema = new gql.GraphQLSchema({
    query: query.queryType //,
        // mutation: query.mutationType
});
// var context = new SchemaValidationContext(schema);
// validateObjectInterfaces
module.exports = schema