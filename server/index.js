require('dotenv').config();

import "@babel/polyfill";
import mongoose from 'mongoose';
import { resolve } from 'path';
import { mergeTypes, fileLoader } from 'merge-graphql-schemas';
import { ApolloServer, gql } from 'apollo-server-express';
import cors from 'cors';
import express from 'express';

import resolvers from './resolvers';

const schema = mergeTypes(
  fileLoader(resolve(__dirname, './schema'))
);

const apolloOptions = {
  typeDefs: gql(schema),
  resolvers
};

const app = express();
app.use(cors());

const apolloServer = new ApolloServer(apolloOptions);

apolloServer.applyMiddleware({app, path: '/', cors: {origin: '*'}});

app.listen(process.env.PORT || parseInt(process.env.SERVER_PORT), () => {
  mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useFindAndModify: false });
});

// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useFindAndModify: false })
//   .then(() => {
//     const apolloServer = new ApolloServer(apolloOptions).listen(
//       {port: process.env.PORT || parseInt(process.env.SERVER_PORT)}
//     )

//     return apolloServer;
//   })
//   .then(({ url, subscriptionsUrl }) => {
//     console.log(`🚀 Server ready at ${url}`);
//     console.log(`🚀 Subscriptions ready at ${subscriptionsUrl}`);
//   });