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
        @clickWillWin="handleVote"
         />
    </div>

    <button @click="handleCreateUser">Vote</button>
  </div>
</template>

<script>
// @ is an alias to /src
import Category from '@/components/Category.vue';
import { GETCATEGORIES } from '../gql/queries/oscars.queries';
import { createUserwVotes } from '../gql/mutations/oscars.mutations';
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
                  votes: this.votes
              }
          })
      },

      handleVote(categoryID, nomineeID, isWillWin) {
          const updVotes = _.cloneDeep(this.votes);
          const voteIdx = updVotes.findIndex((vote) => vote.category === categoryID);
          
          if (voteIdx >= 0) {
              if (isWillWin) {
                  updVotes[voteIdx].willWin = updVotes[voteIdx].willWin === nomineeID ? null : nomineeID;
              } else {
                  updVotes[voteIdx].shouldWin = updVotes[voteIdx].shouldWin === nomineeID ? null : nomineeID;
              }
          }

          this.votes = updVotes;
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
