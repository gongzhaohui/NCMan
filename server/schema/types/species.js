'use strict';
// The graphql-sync module is a thin wrapper around graphql-js
// which provides an identical API except it doesn't use promises
// and instead always resolves synchronously. This allows us to
// use it in Foxx (which doesn't support async resolution).
const gql = require('graphql');
const speciesType = new gql.GraphQLEnumType({
    name: 'Species',
    description: 'Species of a character: human or droid.',
    values: {
        HUMAN: {
            value: 'human', // The internal value stored in ArangoDB
            description: 'A humanoid creature in the Star Wars universe.'
        },
        DROID: {
            value: 'droid',
            description: 'A mechanical creature in the Star Wars universe.'
        }
    }
});
module.exports = speciesType