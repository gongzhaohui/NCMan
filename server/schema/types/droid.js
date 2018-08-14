'use strict';
const gql = require('graphql');
const characterInterface = require('./character');
const speciesType = require('./species');
const episodeType = require('./episode');

const droidType = new gql.GraphQLObjectType({
    name: 'Droid',
    description: 'A mechanical creature in the Star Wars universe.',
    fields() {
        return {
            id: {
                type: new gql.GraphQLNonNull(gql.GraphQLString),
                description: 'The id of the droid.',
                resolve(droid) {
                    return droid._key;
                }
            },
            species: {
                type: new gql.GraphQLNonNull(speciesType),
                description: 'The species of the droid.',
                resolve(droid) {
                    return droid.$type;
                }
            },
            name: {
                type: gql.GraphQLString,
                description: 'The name of the droid.'
            },
            friends: {
                type: new gql.GraphQLList(characterInterface),
                description: 'The friends of the droid, or an empty list if they have none.',
                args: {
                    species: {
                        type: speciesType,
                        description: 'The species of the friends.'
                    }
                },
                resolve(droid, args) {
                    const species = args.species || null;
                    return db.query(`
            FOR friend IN ANY ${droid._id} ${friends}
            FILTER !${species} || friend.$type == ${species}
            SORT friend._key ASC
            RETURN friend
          `).then(
                        function(cursor) {
                            // console.log("cursor:" + cursor)
                            return cursor.all();
                        },
                        function(err) {
                            console.log(err);
                            return err;
                        });
                    // .toArray();
                }
            },
            appearsIn: {
                type: new gql.GraphQLList(episodeType),
                description: 'Which movies they appear in.',
                resolve(droid) {
                    return db.query(`
            FOR episode IN OUTBOUND ${droid._id} ${appearsIn}
            SORT episode._key ASC
            RETURN episode
          `).then(
                        function(cursor) {
                            // console.log("cursor:" + cursor)
                            return cursor.all();
                        },
                        function(err) {
                            console.log(err);
                            return err;
                        });
                    // .toArray();
                }
            },
            primaryFunction: {
                type: gql.GraphQLString,
                description: 'The primary function of the droid.'
            }
        };
    },
    interfaces: [characterInterface]
});

module.exports = droidType;