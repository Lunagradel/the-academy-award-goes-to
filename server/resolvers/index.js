import categoryResolvers from './category.resolvers.js';
import voteResolvers from './vote.resolvers.js';

export default {
    Query: {
        ...categoryResolvers.queries,
        ...voteResolvers.queries
    },

    Mutation: {
        ...categoryResolvers.mutations,
        ...voteResolvers.mutations
    },
  }