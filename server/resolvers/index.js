import categoryResolvers from './category.resolvers';

export default {
    Query: {
        ...categoryResolvers.queries
    },

    Mutation: {
        ...categoryResolvers.mutations
    },
  }