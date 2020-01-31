import * as OscarsApi from '../api/oscars.api';

export default {
  queries: {
      users: () => OscarsApi.findUsers()
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