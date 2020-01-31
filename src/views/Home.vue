<template>
  <div class="home">

    <div v-if="users && users.length > 0">
      <p v-for="(user, idx) in users" :key="idx">
        {{user.name}}
      </p>
    </div>
    <table v-if="this.usersScoreData && this.usersScoreData.length > 0">
      <tr>
        <th></th>
        <th>Contestant</th>
        <th><i class="icon ion-ios-trophy"></i></th>
        <th><i class="icon ion-ios-heart"></i></th>
      </tr>
      <tr v-for="(scoreData, idx) in this.usersScoreData" :key="idx" >
        <td>{{idx + 1}}</td>
        <td>{{scoreData.userName}}</td>
        <td>{{scoreData.correctWillWins}}/{{categoriesWithWinners.length}}</td>
        <td>{{scoreData.correctShouldWins}}/{{categoriesWithWinners.length}}</td>
      </tr>
    </table>

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

  updated: function() {      
    console.log('goes here?');
    
      if (this.categoriesWithWinners && this.users) {
          
          if( !this.usersScoreData ) {
            console.log('what?');
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
