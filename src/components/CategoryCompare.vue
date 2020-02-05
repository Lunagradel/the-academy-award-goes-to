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
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
