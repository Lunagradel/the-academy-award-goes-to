import * as OscarsApi from '../api/oscars.api';

export default {
  queries: {
      categories: () => OscarsApi.findCategories(),
      categoriesWithWinners: () => OscarsApi.findCategorieswWinners()
  },

  mutations: {
    async createCategorywNominees(parent, args) {
        const category = await OscarsApi.createCategorywNominees(args);
        console.log("resolver => ", category);
        
        return category;
      },
    async updateCategorywWinner(parent, args) {
      const cat = await OscarsApi.setWinner(args);

      return cat;
    }
  },

  subscriptions: {},
}