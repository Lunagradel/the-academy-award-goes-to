import * as OscarsApi from '../api/oscars.api';

export default {
  queries: {
    //   categories: () => OscarsApi.findCategories()
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