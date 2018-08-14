'use strict';
const gql = require('graphql');
const Types = require('../types')
const speciesType = Types.speciesType;
const episodeType = Types.episodeType;
const characterInterface = Types.characterInterface;
const humanType = Types.humanType;
const droidType = Types.droidType;


const mutationType = new gql.GraphQLObjectType({
    name: 'Query',
    fields() {}
})

module.exports = mutationType