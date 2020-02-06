require('dotenv').config();

import "@babel/polyfill";
import mongoose from 'mongoose';
import { resolve } from 'path';
import { mergeTypes, fileLoader } from 'merge-graphql-schemas';
import { ApolloServer, gql } from 'apollo-server-express';
import resolvers from './resolvers';

const express = require('express');


const schema = mergeTypes(
  fileLoader(resolve(__dirname, './schema'))
);


const apolloOptions = {
  typeDefs: gql(schema),
  resolvers,
  introspection: true,
  playground: true
};

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useFindAndModify: false })
  .then(() => {
    const apolloServer = new ApolloServer(apolloOptions)
    const app = express();

    apolloServer.applyMiddleware({app, cors: {
      origin: '*',			// <- allow request from all domains
      credentials: true
    }});
    
    app.listen(
      {port: process.env.PORT || parseInt(process.env.SERVER_PORT)}
    )

    return app;
  })
  .then(({ url, subscriptionsUrl }) => {
    console.log(`🚀 Server ready at ${url}`);
    console.log(`🚀 Subscriptions ready at ${subscriptionsUrl}`);
  });