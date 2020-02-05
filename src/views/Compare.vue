<template>
    <div class="wrapper">
        <div class="ballot">
            <div class="username-container">
                <p>{{compareUserOne && compareUserOne.name}}</p>
                <p>{{compareUserTwo && compareUserTwo.name}}</p>
            </div>

            <div class="categories-container" v-if="categories && compareUserOne && compareUserTwo && categories.length > 0">
                <CategoryCompare 
                v-for="(cat, index) in categories"
                :key="index"
                v-bind:category="cat"
                v-bind:voteOne="compareUserOne.votes.find((v) => v.category === cat.id)"
                v-bind:voteTwo="compareUserTwo.votes.find((v) => v.category === cat.id)"
                />
            </div>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import CategoryCompare from '@/components/CategoryCompare.vue';
import { GETCATEGORIES, GETCOMPAREUSERS } from '../gql/queries/oscars.queries';
import { createUserwVotes } from '../gql/mutations/oscars.mutations';
import _ from 'lodash';

export default {
  name: 'compare',
  components: {
    CategoryCompare
  },

  apollo: {
      categories: {
          query: GETCATEGORIES
      },
      compareUsers: {
          query: GETCOMPAREUSERS,
          variables () {
            return {compareIds: [this.$route.params.userOneId, this.$route.params.userTwoId]}
        }
      },
  },

  computed: {
      compareUserOne: function() {
          return this.compareUsers && this.compareUsers[0];
      },
      compareUserTwo: function() {
          return this.compareUsers && this.compareUsers[1];
      }
  },
}
</script>
