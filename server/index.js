import mongoose from 'mongoose';
import apollo from 'apollo-server';
import merge from 'merge-graphql-schemas';
import path from 'path';
import resolvers from './resolvers/index.js';

const { ApolloServer, gql } = apollo;
const { mergeTypes, fileLoader } = merge;
const { resolve } = path;

const __dirname = path.resolve();

const schema = mergeTypes(
    fileLoader(resolve(__dirname, './schema'))
);

const apolloOptions = {
  typeDefs: gql(schema),
  resolvers,
  introspection: true,
  playground: true
};

mongoose.connect('mongodb+srv://gradeladmin:r4uajOuyzegGOn60@lunagradel-7orxl.mongodb.net/oscars?retryWrites=true&w=majority', { useNewUrlParser: true, useFindAndModify: false })
  .then(() => {
    const apolloServer = new ApolloServer(apolloOptions).listen(
        { port: process.env.PORT || 4000 }
    )

    return apolloServer;
  })
  .then(({ url, subscriptionsUrl }) => {
    console.log(`🚀 Server ready at ${url}`);
    console.log(`🚀 Subscriptions ready at ${subscriptionsUrl}`);
  });



// require('dotenv').config();

// import "@babel/polyfill";
// import mongoose from 'mongoose';
// import { resolve } from 'path';
// import { mergeTypes, fileLoader } from 'merge-graphql-schemas';
// import { ApolloServer, gql } from 'apollo-server-express';
// import cors from 'cors';
// import express from 'express';

// import resolvers from './resolvers';

// const schema = mergeTypes(
//   fileLoader(resolve(__dirname, './schema'))
// );

// const apolloOptions = {
//   typeDefs: gql(schema),
//   resolvers,
//   introspection: true
// };

// const app = express();
// app.use(cors({origin: '*'}));

// if (process.env.NODE_ENV === 'production') {
// 	app.use(express.static('client/build'));
// }

// app.get('*', (request, response) => {
// 	response.sendFile(path.join(__dirname, 'client/build', 'index.html'));
// });

// const apolloServer = new ApolloServer(apolloOptions);

// apolloServer.applyMiddleware({app, path: '/graphql', cors: {origin: '*'}});

// app.listen(process.env.PORT || parseInt(process.env.SERVER_PORT), () => {
//   mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useFindAndModify: false });
// });

// // mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useFindAndModify: false })
// //   .then(() => {
// //     const apolloServer = new ApolloServer(apolloOptions).listen(
// //       {port: process.env.PORT || parseInt(process.env.SERVER_PORT)}
// //     )

// //     return apolloServer;
// //   })
// //   .then(({ url, subscriptionsUrl }) => {
// //     console.log(`🚀 Server ready at ${url}`);
// //     console.log(`🚀 Subscriptions ready at ${subscriptionsUrl}`);
// //   });


