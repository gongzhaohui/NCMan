'use strict';
const gql = require('graphql');
const Types = require('../types')
const speciesType = Types.speciesType;
const episodeType = Types.episodeType;
const characterInterface = Types.characterInterface;
const humanType = Types.humanType;
const droidType = Types.droidType;
const DbSolvers = require('../../db');

const characters = DbSolvers.characters;


const queryType = new gql.GraphQLObjectType({
    name: 'Query',
    fields() {
        return {
            hero: {
                type: characterInterface,
                args: {
                    episode: {
                        description: 'If omitted, returns the hero of the whole saga. If provided, returns the hero of that particular episode.',
                        type: gql.GraphQLString
                    }
                },
                resolve(root, args) {
                    return characters.document(
                        args.episode === 'NewHope' ? '1000' :
                        args.episode === 'Awakens' ? '2002' : '2001'
                    );
                }
            },
            human: {
                type: humanType,
                args: {
                    id: {
                        description: 'id of the human',
                        type: new gql.GraphQLNonNull(gql.GraphQLString)
                    }
                },
                resolve(root, args) {
                    // We're using firstExample to make sure we only
                    // return documents with the right "$type".
                    return characters.firstExample({
                        _key: args.id,
                        $type: 'human'
                    });
                }
            },
            droid: {
                type: droidType,
                args: {
                    id: {
                        description: 'id of the droid',
                        type: new gql.GraphQLNonNull(gql.GraphQLString)
                    }
                },
                resolve(root, args) {
                    return characters.firstExample({
                        _key: args.id,
                        $type: 'droid'
                    });
                }
            }
        };
    }
});

module.exports = queryType;