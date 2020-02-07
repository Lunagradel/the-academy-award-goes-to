<template>
  <div class="category">
    <h3 class="category-title">{{ category.title }}</h3>
    <div class="nominees">
        <div class="nominee" v-for="nominee in category.nominees" :key="nominee.id">

            <div class="nominee-compare-info">
                <div></div>
                <div></div>
            </div>
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

  method: {
    t() {
      // vote.willWin === nominee.id ? vote.shouldWin === nominee.id ? 'active-nom-both' : 'active-nom-will-win' : vote.shouldWin === nominee.id ? 'active-nom-should-win' : ''
     
      // 'active-will-win-both-users'
      // 'active-will-win-user-one'
      // 'active-will-win-user-two'

      // 'active-should-win-both-users'
      // 'active-should-win-user-one'
      // 'active-should-win-user-two'

      // 'active-both-win-both-users'
      // 'active-both-win-user-one'
      // 'active-both-win-user-two'

      // 'active-will-win-user-one-should-win-user-two'
      // 'active-will-win-user-two-should-win-user-one'
      // 'active-will-win-user-one-both-win-user-two'
      // 'active-will-win-user-two-both-win-user-one'

      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
