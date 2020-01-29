import categoryResolvers from './category.resolvers';
import voteResolvers from './vote.resolvers';

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