<template>
  <div>
    <h3>{{ category.title }}</h3>
    <div>
        <div v-for="nominee in category.nominees" :key="nominee.id">
            <div class="t">
                <i v-bind:class="vote && vote.willWin === nominee.id ? 'ion-ios-circle-filled' : 'ion-ios-circle-outline'" @click="handleUpdateVote(nominee.id, true)" />
                <i v-bind:class="vote && vote.shouldWin === nominee.id ? 'ion-ios-heart' : 'ion-ios-heart-outline'" @click="handleUpdateVote(nominee.id, false)" />
            </div>
            <div>
                <p v-if="category.isFilmNominated">{{nominee.film}}</p>
                <p v-else v-for="(person, idx) in nominee.persons" :key="idx" >{{person}}</p>
            </div>
            <div>
                <p v-if="!category.isFilmNominated">{{nominee.film}}</p>
                <p v-else v-for="(person, idx) in nominee.persons" :key="idx" >{{person}}</p>
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
