<template>
  <div class="wrapper">

    <h1>The Academy Award goes to...</h1>
    <!-- <p>Make your bet now on who will take home the Oscars 2020. Woop so exciting.</p> -->

    <div class="btn-container">
      <router-link to="/vote"><div class="primary-btn">Vote here!</div></router-link>
    </div>

    <div class="ballot">
      <!-- <div class="title">
          <h1>The Academy Award goes to...</h1>
      </div> -->

      <!-- <div class="users-container" v-if="users && users.length > 0">
        <h2>Contestants</h2>
        <div class="users">
            <p class="user" v-for="(user, idx) in users" :key="idx">
              {{user.name}}
            </p>
        </div>
      </div> -->


      <div class="score-container" v-if="this.usersScoreData && this.usersScoreData.length > 0">
        <div class="awards-given-container">
          <div class="awards-given">
            <p>Oscars awarded</p> 
            <p>{{categoriesWithWinners.length}} / 22</p>
          </div>
        </div>
        <table>
          <tr>
            <th width="10%">#</th>
            <th widtH="50%">Contestant</th>
            <th><i class="icon ion-ios-trophy"></i></th>
            <th><i class="icon ion-ios-heart"></i></th>
          </tr>
          <tr v-for="(scoreData, idx) in this.usersScoreData" :key="idx" >
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

              updUsersScoreData.push({userName: user.name, correctWillWins: setCorrectWillWins, correctShouldWins: setCorrectShouldWins});
            });
          
          const updUsersScoreDataSorted = _.orderBy(updUsersScoreData, [(user) => user.correctWillWins, (user) => user.userName], ['desc', 'asc']);
          
          this.usersScoreData = updUsersScoreDataSorted;
      }

    }
  },

  data: () => ({
      usersScoreData: null
  })
}
</script>
