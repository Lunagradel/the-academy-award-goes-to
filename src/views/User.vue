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

            <div class="compare-container" v-if="users && users.length > 0">
                <p>Compare with:</p>
                <div v-for="(uc, idx) in otherUsers" :key="idx" @click="handleCompareClick(uc.id)">{{uc.name}}</div>
            </div>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import Category from '@/components/Category.vue';
import { GETCATEGORIES, GETUSER, GETUSERS } from '../gql/queries/oscars.queries';
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
      },
      users: {
          query: GETUSERS
      }
  },

  methods: {

      handleCompareClick(compareUserId) {
          this.$router.push({name: 'compare', params: {userOneId: this.user.id, userTwoId: compareUserId}});
      }

  },

  computed: {
      otherUsers: function() {
          return this.user && this.users.filter((user) => user.id !== this.user.id);
      }
  }
}
</script>
