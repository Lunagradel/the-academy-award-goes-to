<template>
  <div class="wrapper">

    <div class="txt-container">
      <h1>The Academy Award goes to...</h1>
      <p>Well...Who do you think?</p>
    </div>

    <div class="btn-container">
      <router-link to="/vote"><div class="vote-btn">Vote!</div></router-link>
    </div>

    <div class="ballot">
      <div class="score-container">
        <table>
          <tr>
            <th width="10%">#</th>
            <th widtH="50%">Contestant</th>
            <th><i class="icon ion-ios-trophy"></i></th>
            <th><i class="icon ion-ios-heart"></i></th>
          </tr>
          <tr v-for="(scoreData, idx) in this.usersScoreData" :key="idx" @click="handleUserClick(scoreData.userID)">
            <td class="place"><span>{{idx + 1}}</span></td>
            <td>{{scoreData.userName}}</td>
            <td>{{scoreData.correctWillWins}} / {{categoriesWithWinners.length}}</td>
            <td>{{scoreData.correctShouldWins}} / {{categoriesWithWinners.length}}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { GETCATEGORIESWITHWINNERS, GETUSERS } from '../gql/queries/oscars.queries';
import _ from 'lodash';

export default {
  name: 'home',
  components: {

  },

  apollo: {
      categoriesWithWinners: {
        query: GETCATEGORIESWITHWINNERS
      },
      users: {
        query: GETUSERS
      }
  },

  watch: {
    categoriesWithWinners: function(val) {
      if(this.categoriesWithWinners && this.users && this.handleSetUserScoreData){
        this.handleSetUserScoreData();
      }
    }
    
  },

  methods: {
    handleSetUserScoreData() {

      if( !this.usersScoreData ) {
            let updUsersScoreData = [];

            this.users.forEach((user) => {
              let setCorrectWillWins = 0;
              let setCorrectShouldWins = 0;

              this.categoriesWithWinners.forEach((cat) => {
                const categoryVote = user.votes.find((v) => v.category === cat.id);

                if (categoryVote) {
                  if (categoryVote.willWin === cat.winner) {
                    setCorrectWillWins++;
                  }
                  if(categoryVote.shouldWin === cat.winner) {
                    setCorrectShouldWins++;
                  }
                }

              });

              updUsersScoreData.push({userName: user.name, userID: user.id, correctWillWins: setCorrectWillWins, correctShouldWins: setCorrectShouldWins});
            });
          
          const updUsersScoreDataSorted = _.orderBy(updUsersScoreData, [(user) => user.correctWillWins, (user) => user.userName.toLowerCase()], ['desc', 'asc']);
          
          this.usersScoreData = updUsersScoreDataSorted;
      }

    },

    handleUserClick(id) {
      this.$router.push({name: 'user', params: {id: id}});
    }
  },

  data: () => ({
      usersScoreData: null
  })
}
</script>
