<template>
  <div>
      Vote here
    <input v-model="name" placeholder="username" />

    <div v-if="categories && categories.length > 0">
        <Category 
        v-for="(cat, index) in categories"
        :key="index"
        v-bind:category="cat"
        v-bind:vote="votes[index]"

         />
    </div>

    <button @click="handleCreateUser">Vote</button>
  </div>
</template>

<script>
// @ is an alias to /src
import Category from '@/components/Category.vue';
import { GETCATEGORIES } from '../gql/queries/categories.queries';
import { createUserwVotes } from '../gql/mutations/user.mutations';
import _ from 'lodash';

export default {
  name: 'vote',
  components: {
    Category
  },

  apollo: {
      categories: {
          query: GETCATEGORIES
      }
  },

  methods: {
      handleCreateUser() {
          this.$apollo.mutate({
              mutation: createUserwVotes,
              variables: {
                  name: this.name,
                  votes: [{category: '5e260c085157926f0f031a17', willWin: '5e260c085157926f0f031a17'}]
              }
          })
      }
  },

  updated: function() {      
      if (this.votes.length <= 0 && this.categories) {
          const catClone = _.cloneDeep(this.categories);
          const newVotes = catClone.map((cat) => ({category: cat.id, willWin: null, shouldWin: null}));
          this.votes = newVotes;
      }
  },

  data: () => ({
      name: '',
      votes: []
  })
}
</script>
