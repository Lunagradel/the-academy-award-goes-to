<template>
  <div>

    <div v-if="categories && categories.length > 0">
        <CategoryWinners
        v-for="(cat, index) in categories"
        :key="index"
        v-bind:category="cat"
        @clickWinner="handleWinner"
         />
        
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
import CategoryWinners from '@/components/CategoryWinners.vue';
import { GETCATEGORIES } from '../gql/queries/oscars.queries';
import { updCategorywWinner } from '../gql/mutations/oscars.mutations';
import _ from 'lodash';

export default {
  name: 'winners',
  components: {
    CategoryWinners
  },

  apollo: {
      categories: {
          query: GETCATEGORIES
      }
  },

  methods: {

      // handleCreateUser() {

      //   //   this.$apollo.mutate({
      //   //       mutation: createUserwVotes,
      //   //       variables: {
      //   //           name: this.name,
      //   //           votes: this.votes
      //   //       }
      //   //   })
      // },

      handleWinner(categoryID, nomineeID) {
        console.log('cat',categoryID);
        console.log('nom',nomineeID);

          this.$apollo.mutate({
              mutation: updCategorywWinner,
              variables: {
                  categoryID: categoryID,
                  nomineeID: nomineeID
              }
          })
      }
  }
}
</script>
