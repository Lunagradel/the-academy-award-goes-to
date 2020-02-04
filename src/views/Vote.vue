<template>
    <div class="wrapper">
        <div class="ballot">
            <div class="username-container">
                <p>Name:</p>
                <input v-model="name" />
            </div>

            <div class="rules">
                <div class="rule">
                    <i class="icon ion-ios-trophy"></i>
                    <p>= Vote for who <span>will</span> win the Oscar.</p>
                </div>
                <div class="rule">
                    <i class="icon ion-ios-heart"></i>
                    <p>= Vote for who <span>should</span> win the Oscar. (Optional)</p>
                </div>
            </div>

            <div class="categories-container" v-if="categories && categories.length > 0">
                <Category 
                v-for="(cat, index) in categories"
                :key="index"
                v-bind:category="cat"
                v-bind:vote="votes[index]"
                @clickWillWin="handleVote"
                />
            </div>
            <div class="btn-container">
                <div class="primary-btn" @click="handleCreateUser">Vote</div>
                <div class="error-txt" v-if="this.errTxt" v-html="this.errTxt"></div>
            </div>
        </div>
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

          this.errTxt = '';

          if (!this.handleValidate()) {
              return;
          }

          this.$apollo.mutate({
              mutation: createUserwVotes,
              variables: {
                  name: this.name,
                  votes: this.votes
              }
          })
      },

      handleValidate() {
          if (this.name === '') {
            this.errTxt = 'A name must be given.'
            return false;
          }

          const checkVotes = _.cloneDeep(this.votes);
          const willWins = checkVotes.filter((vote) => vote.willWin !== null);

          if (checkVotes.length !== willWins.length) {
              this.errTxt = 'One <i class="icon ion-ios-trophy"></i> must be selected for each category.'
              return false;
          } 

          return true;
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
      votes: [],
      errTxt: ''
  })
}
</script>
