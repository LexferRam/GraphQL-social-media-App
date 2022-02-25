const { ApolloServer,/* PubSub*/ } = require('apollo-server')
const mongoose = require('mongoose')

const typeDefs = require('./graphql/typesDefs')
const resolvers = require('./graphql/resolvers')
const {MONGODB} = require('./config.js')

// const pubsub = new PubSub()

const server = new ApolloServer({ typeDefs, resolvers, context:({req}) => ({req,/*pubsub*/}) })

mongoose.connect(MONGODB, {useNewUrlParser: true}).then(() => {

    console.log('MongoDB Connected')

    return server
            .listen({port:5000})
            .then(({ url }) => {
                console.log(`🚀  Server ready at ${url}`);
            });
});

