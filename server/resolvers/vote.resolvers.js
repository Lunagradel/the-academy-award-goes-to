import * as OscarsApi from '../api/oscars.api';

export default {
  queries: {
      users: () => OscarsApi.findUsers(),
      user: (parent, args) => {
        return OscarsApi.findUserById(args)
      },
      compareUsers: (parent, args) => OscarsApi.findUsersById(args)
      
  },

  mutations: {
    async addUserwVotes(parent, args) {
        const votes = await OscarsApi.createUserwVotes(args);
        console.log("resolver => ", votes);
        
        return votes;
    }

  },

  subscriptions: {},
}