<template>
  <div>
    <h3>{{ category.title }}</h3>
    <div>
        <div v-for="nominee in category.nominees" :key="nominee.id">
            <div class="t">
                <i v-bind:class="category.winner === nominee.id ? 'icon ion-ios-trophy' : 'icon ion-ios-trophy-outline'" @click="handleUpdateWinner(nominee.id, true)" />
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
  name: 'CategoryWinners',
  props: {
    category: Object,
  },

  methods: {
      handleUpdateWinner(nomineeId) {
          this.$emit("clickWinner", this.category.id, nomineeId);
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
