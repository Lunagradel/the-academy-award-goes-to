<template>
  <div class="category">
    <h3 class="category-title">{{ category.title }}</h3>
    <div class="nominees">
        <div class="nominee" v-for="nominee in category.nominees" :key="nominee.id">
            <div class="vote-icons">
                <i v-bind:class="vote && vote.willWin === nominee.id ? 'icon ion-ios-trophy' : 'icon ion-ios-trophy-outline'" @click="handleUpdateVote(nominee.id, true)" />
                <i v-bind:class="vote && vote.shouldWin === nominee.id ? 'icon ion-ios-heart' : 'icon ion-ios-heart-outline'" @click="handleUpdateVote(nominee.id, false)" />
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
  name: 'Category',
  props: {
    category: Object,
    vote: Object
  },

  methods: {
      handleUpdateVote(nomineeId, willWin) {
          this.$emit("clickWillWin", this.category.id, nomineeId, willWin);
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
