'use strict';
const gql = require('graphql');
const Types = require('../types');

const nc_user = Types.nc_user;
const DataLoader = require('dataloader');
const DbSolvers = require('../../db');
const db = DbSolvers.db;
const userLoader = new DataLoader(DbSolvers.getUser);

const nc_user_col = DbSolvers.nc_user_col;

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
                resolve: (source, args, context, ast) => DbSolvers.getUser(args.id)
            }

        };
    }
});

module.exports = queryType;
