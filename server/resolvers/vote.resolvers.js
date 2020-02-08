import * as OscarsApi from '../api/oscars.api.js';

export default {
  queries: {
      users: () => OscarsApi.findUsers(),
      user: (parent, args, t, tt) => {
        console.log('parent', parent);
        console.log('args',args);
        console.log(t);
        console.log(tt);
        
        
        return OscarsApi.findUserById(args)
      }
      
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