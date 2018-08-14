'use strict';
const gql = require('graphql');
const characterInterface = require('./character');
const speciesType = require('./species');
const episodeType = require('./episode');
const DbSolvers = require('../../db');
const DataLoader = require('dataloader');

const db = DbSolvers.db;
const FriendsLoader = new DataLoader(DbSolvers.getFriendsByIDs);
const AppearinsLoader = new DataLoader(DbSolvers.getAppearinsByIDs);

const humanType = new gql.GraphQLObjectType({
    name: 'Human',
    description: 'A humanoid creature in the Star Wars universe.',
    fields() {
        return {
            id: {
                type: new gql.GraphQLNonNull(gql.GraphQLString),
                description: 'The id of the human.',
                resolve(human) {
                    return human._key;
                }
            },
            species: {
                type: new gql.GraphQLNonNull(speciesType),
                description: 'The species of the human.',
                resolve(human) {
                    return human.$type;
                }
            },
            name: {
                type: gql.GraphQLString,
                description: 'The name of the human.'
            },
            friends: {
                type: new gql.GraphQLList(characterInterface),
                description: 'The friends of the human, or an empty list if they have none.',
                args: {
                    species: {
                        type: speciesType,
                        description: 'The species of the friends.'
                    }
                },
                resolve(human, args) {
                    // We want to store friendship relations as edges in an
                    // edge collection. Here we're returning the friends of
                    // a character with an AQL graph traversal query, see
                    // https://docs.arangodb.com/Aql/GraphTraversals.html#working-on-collection-sets
                    const species = args.species || null;
                    return FriendsLoader(human._id, species)
                        // .toArray();
                }
            },
            appearsIn: {
                type: new gql.GraphQLList(episodeType),
                description: 'Which movies they appear in.',
                resolve(human) {
                    // This query is similar to the friends query except
                    // episode appearances are directional (a character
                    // appears in an episode, but an episode does not
                    // appear in a character), so we are only interested
                    // in OUTBOUND edges.
                    return AppearinsLoader(human._id)
                }
            },
            homePlanet: {
                type: gql.GraphQLString,
                description: 'The home planet of the human, or null if unknown.'
            }
        };
    },
    interfaces: [characterInterface]
});

module.exports = humanType;