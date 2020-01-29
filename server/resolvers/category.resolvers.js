import * as OscarsApi from '../api/oscars.api';

export default {
  queries: {
      categories: () => OscarsApi.findCategories()
  },

  mutations: {
    async createCategorywNominees(parent, args) {
        const category = await OscarsApi.createCategorywNominees(args);
        console.log("resolver => ", category);
        
        return category;
      }
  },

  subscriptions: {},
}