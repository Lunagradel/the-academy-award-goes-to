<template>
  <div class="category">
    <h3 class="category-title">{{ category.title }}</h3>
    <div class="nominees">
        <div class="nominee" v-for="nominee in category.nominees" :key="nominee.id" :class="activeClasses(nominee.id)">

            <div class="nominee-info">
                <p class="nominee-main" v-if="category.isFilmNominated">{{nominee.film}}</p>
                <p class="nominee-main" v-else v-for="(person, idx) in nominee.persons" :key="idx" >{{person}}</p>

                <p class="nominee-extra" v-if="!category.isFilmNominated">{{nominee.film}}</p>
                <p class="nominee-extra" v-else v-for="(person, idx) in nominee.persons" :key="idx" >{{person}}{{idx !== nominee.persons.length - 1 ? ',' : '' }}</p>
            </div>
            
        </div>
    </div>
</div>
</template>

<script>
export default {
  name: 'CategoryCompare',
  props: {
    category: Object,
    voteOne: Object,
    voteTwo: Object
  },

  methods: {
    activeClasses: function(nomineeID) {
      // vote.willWin === nominee.id ? vote.shouldWin === nominee.id ? 'active-nom-both' : 'active-nom-will-win' : vote.shouldWin === nominee.id ? 'active-nom-should-win' : ''

      if (this.voteOne && this.voteTwo) {
        return {
          'active-will-win-both-users': this.voteOne.willWin === nomineeID && this.voteOne.shouldWin !== nomineeID && this.voteTwo.willWin === nomineeID && this.voteTwo.shouldWin !== nomineeID,
          'active-will-win-user-one': this.voteOne.willWin === nomineeID && this.voteOne.shouldWin !== nomineeID && this.voteTwo.willWin !== nomineeID && this.voteTwo.shouldWin !== nomineeID,
          'active-will-win-user-two': this.voteOne.willWin !== nomineeID && this.voteOne.shouldWin !== nomineeID && this.voteTwo.willWin === nomineeID && this.voteTwo.shouldWin !== nomineeID,
          'active-should-win-both-users': this.voteOne.shouldWin === nomineeID && this.voteOne.willWin !== nomineeID && this.voteTwo.shouldWin === nomineeID && this.voteTwo.willWin !== nomineeID,
          'active-should-win-user-one': this.voteOne.shouldWin === nomineeID && this.voteOne.willWin !== nomineeID && this.voteTwo.shouldWin !== nomineeID && this.voteTwo.willWin !== nomineeID,
          'active-should-win-user-two': this.voteOne.shouldWin !== nomineeID && this.voteOne.willWin !== nomineeID && this.voteTwo.shouldWin === nomineeID && this.voteTwo.willWin !== nomineeID,
          'active-both-win-both-users': this.voteOne.shouldWin === nomineeID && this.voteOne.willWin === nomineeID && this.voteTwo.shouldWin === nomineeID && this.voteTwo.willWin === nomineeID,
          'active-both-win-user-one': this.voteOne.willWin === nomineeID && this.voteOne.shouldWin === nomineeID && this.voteOne.willWin !== nomineeID && this.voteTwo.shouldWin !== nomineeID,
          'active-both-win-user-two': this.voteOne.willWin !== nomineeID && this.voteOne.shouldWin !== nomineeID && this.voteOne.willWin === nomineeID && this.voteTwo.shouldWin === nomineeID,
          'active-will-win-user-one-should-win-user-two': this.voteOne.willWin === nomineeID && this.voteOne.shouldWin !== nomineeID && this.voteTwo.shouldWin === nomineeID && this.voteTwo.willWin !== nomineeID,
          'active-will-win-user-two-should-win-user-one': this.voteOne.willWin !== nomineeID && this.voteOne.shouldWin === nomineeID && this.voteTwo.shouldWin !== nomineeID && this.voteTwo.willWin === nomineeID,
          'active-will-win-user-one-both-win-user-two': this.voteOne.willWin === nomineeID && this.voteOne.shouldWin !== nomineeID && this.voteTwo.shouldWin === nomineeID && this.voteTwo.willWin === nomineeID,
          'active-will-win-user-two-both-win-user-one': this.voteOne.willWin === nomineeID && this.voteOne.shouldWin === nomineeID && this.voteTwo.shouldWin === nomineeID && this.voteTwo.willWin !== nomineeID,
          'active-should-win-user-one-both-win-user-two': this.voteOne.willWin !== nomineeID && this.voteOne.shouldWin === nomineeID && this.voteTwo.shouldWin === nomineeID && this.voteTwo.willWin === nomineeID,
          'active-should-win-user-two-both-win-user-one': this.voteOne.willWin === nomineeID && this.voteOne.shouldWin === nomineeID && this.voteTwo.shouldWin !== nomineeID && this.voteTwo.willWin === nomineeID,
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
