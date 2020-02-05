<template>
    <div class="wrapper">
        <div class="ballot">
            <div class="username-container">
                <p>Name:</p>
                <input v-if="this.user" v-model="this.user.name" :disabled="true" />
            </div>

            <div class="categories-container" v-if="categories && user && categories.length > 0">
                <Category 
                v-for="(cat, index) in categories"
                :key="index"
                v-bind:category="cat"
                v-bind:vote="user.votes.find((v) => v.category === cat.id)"
                @clickWillWin="() => {}"
                />
            </div>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import Category from '@/components/Category.vue';
import { GETCATEGORIES, GETUSER } from '../gql/queries/oscars.queries';
import { createUserwVotes } from '../gql/mutations/oscars.mutations';
import _ from 'lodash';

export default {
  name: 'user',
  components: {
    Category
  },

  apollo: {
      categories: {
          query: GETCATEGORIES
      },
      user: {
          query: GETUSER,
          variables () {
            return {id: this.$route.params.id}
        }
      }
  },

  methods: {

  },
}
</script>
