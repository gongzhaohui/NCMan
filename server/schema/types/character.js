'use strict';
const gql = require('graphql');
const speciesType = require('./species');
const episodeType = require('./episode');
const humanType = require('./human');
const droidType = require('./droid');

const characterInterface = new gql.GraphQLInterfaceType({
    name: 'Character',
    description: 'A character in the Star Wars Trilogy',
    fields() {
        return {
            id: {
                type: new gql.GraphQLNonNull(gql.GraphQLString),
                description: 'The id of the character.'
            },
            species: {
                type: new gql.GraphQLNonNull(speciesType),
                description: 'The species of the character.'
            },
            name: {
                type: gql.GraphQLString,
                description: 'The name of the character.'
            },
            friends: {
                type: new gql.GraphQLList(characterInterface),
                description: (
                    'The friends of the character, ' +
                    'or an empty list if they have none.'
                ),
                args: {
                    species: {
                        type: speciesType,
                        description: 'The species of the friends.'
                    }
                }
            },
            appearsIn: {
                type: new gql.GraphQLList(episodeType),
                description: 'Which movies they appear in.'
            }
        };
    },
    resolveType(character) {
        // Droids and humans have different fields.
        // The "$type" property allows GraphQL to decide which
        // GraphQL type a document should correspond to.
        return character.$type === 'droid' ? droidType : humanType;
    }
});

module.exports = characterInterface;