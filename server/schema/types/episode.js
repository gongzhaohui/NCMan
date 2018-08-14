'use strict';
const gql = require('graphql');
// In the original graphql-js test fixtures episodes
// are defined using a GraphQL ENUM type. Because we're
// in a database, it makes more sense to define them
// as an object type backed by a collection.
const episodeType = new gql.GraphQLObjectType({
    name: 'Episode',
    description: 'An episode in the Star Wars Trilogy.',
    fields() {
        return {
            id: {
                type: new gql.GraphQLNonNull(gql.GraphQLString),
                description: 'The id of the episode.',
                resolve(episode) {
                    // The objects exposed by GraphQL have an "id"
                    // field which corresponds to ArangoDB's "_key"
                    // property. This mapping isn't strictly necessary
                    // but hides the implementation of the data
                    // source to make it more consistent with other
                    // GraphQL APIs.
                    return episode._key;
                }
            },
            // These fields directly correspond to properties
            // on the documents and thus don't need "resolve"
            // methods.
            title: {
                type: gql.GraphQLString,
                description: 'The title of the episode.'
            },
            description: {
                type: gql.GraphQLString,
                description: 'The description of the episode.'
            }
        };
    }
});
module.exports = episodeType;