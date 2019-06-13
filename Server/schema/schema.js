'use strict';

const graphql = require('graphql');

const { GraphQLSchema } = graphql;

const okssQueries = require('./queries');

const okssMutations= require('./mutations');

module.exports=new GraphQLSchema({
    mutation:okssMutations,
    query:okssQueries
})


