'use strict';
const gql = require('graphql');
const Types = require('../types')

const nc_user = Types.nc_user;

const DbSolvers = require('../../db');
const nc_user_col = db.nc_user_col;

const queryType = new gql.GraphQLObjectType({
    name: 'Query',
    fields() {
        return {
            nc_user: {
                type: nc_user,
                args: {
                    id: {
                        description: 'If omitted, returns all.',
                        type: gql.GraphQLString
                    }
                },
                resolve(root, args) {
                    return nc_user_col.document(
                        args.id
                    );
                }
            }

        };
    }
});

module.exports = queryType;