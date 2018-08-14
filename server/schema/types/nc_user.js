'use strict';
const gql = require('graphql');

const nc_user = new gql.GraphQLObjectType({
    name: 'nc_user',
    description: 'nc users.',
    fields() {
        return {
            id: {
                type: new gql.GraphQLNonNull(gql.GraphQLString),
                description: 'The id of the human.',
                resolve(source) {
                    return source._key;
                }
            },
            title: {
                type: gql.GraphQLString,
                description: 'title.' //,
                    // resolve(source) {
                    //     return source.title;
                    // }
            },
            name: {
                type: gql.GraphQLString,
                description: 'The name of the user.' //,
                    // resolve(source) {
                    //     return source.name;
                    // }
            },
            email: {
                type: gql.GraphQLString,
                description: 'email'
            },
            birthday: {
                type: gql.GraphQLString,
                description: "birthday"
            }
        };
    }
});

module.exports = nc_user