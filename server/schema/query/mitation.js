'use strict';
const gql = require('graphql');
const Types = require('../types')


const mutationType = new gql.GraphQLObjectType({
    name: 'Mutation',
    fields() {}
})

module.exports = mutationType;