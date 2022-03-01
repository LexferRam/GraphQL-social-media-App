require('dotenv').config()
const { ApolloServer } = require('apollo-server-express');
const express = require('express')

// const { ApolloServer,/* PubSub*/ } = require('apollo-server')
const mongoose = require('mongoose')

const typeDefs = require('./graphql/typesDefs')
const resolvers = require('./graphql/resolvers')
// const {MONGODB} = require('./config.js')

const app = express();

const connectDB = async () => {
    try {
       await mongoose.connect(process.env.MONGODB, {useNewUrlParser: true})    
    } catch (error) {
        console.log(error)
    }
}

connectDB()

module.exports = app;

// const pubsub = new PubSub()

// const server = new ApolloServer({ typeDefs, resolvers, context:({req}) => ({req,/*pubsub*/}) })

// mongoose.connect(MONGODB, {useNewUrlParser: true}).then(() => {

//     console.log('MongoDB Connected')

//     return server
//             .listen({port:5000})
//             .then(({ url }) => {
//                 console.log(`🚀  Server ready at ${url}`);
//             });
// });

app.get('/', (req,res) => res.send('Welcome to my app!'))

async function start(){
    const apolloServer = new ApolloServer({ typeDefs, resolvers, context:({req}) => ({req,/*pubsub*/}) })

    await apolloServer.start();
    apolloServer.applyMiddleware({app})

    app.listen(5000, () => {
        console.log('Server on port', 5000)
    })
}

start()